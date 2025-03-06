import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AzureKeyCredential } from '@azure/core-auth';

import createClient, {
  AnalyzedDocumentOutput,
  AnalyzeOperationOutput,
  DocumentIntelligenceClient,
  DocumentIntelligenceErrorResponseOutput,
  getLongRunningPoller,
  isUnexpected,
} from '@azure-rest/ai-document-intelligence';
import {
  ReceiptItemsArray,
  validateReceiptFields,
} from './types/documentReceipt';
import { InjectDataSource } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { DataSource } from 'typeorm';
import { Product } from '../product/product.entity';
import { PurchaseDto } from './dtos/purchase.dto';
import { CreatePurchaseDto } from './dtos/create-purchase.dto';
import { PurchaseStatus } from './enums/status.enum';

@Injectable()
export class PurchaseService {
  private readonly client: DocumentIntelligenceClient;

  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    const diEndpoint = this.configService.get<string>('DI_ENDPOINT');
    const diKey = this.configService.get<string>('DI_KEY');

    if (!diEndpoint || !diKey) {
      throw new UnauthorizedException(
        'Credentials for connecting to Azure DI are invalid!',
      );
    }

    this.client = createClient(diEndpoint, new AzureKeyCredential(diKey));
  }

  async processAndSavePurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<PurchaseDto | undefined> {
    try {
      const receiptDocument = await this.analyzeReceiptDocument(
        createPurchaseDto.file,
      );
      const receiptItems = this.getReceiptItemsFromDocument(receiptDocument);
      return await this.savePurchase(createPurchaseDto.date, receiptItems);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async analyzeReceiptDocument(
    receiptFile: Express.Multer.File,
  ): Promise<AnalyzedDocumentOutput> {
    const initialResponse = await this.client
      .path('/documentModels/{modelId}:analyze', 'prebuilt-receipt')
      .post({
        contentType: 'application/json',
        body: {
          base64Source: receiptFile.buffer.toString('base64'),
        },
      });

    if (isUnexpected(initialResponse)) {
      throw new UnprocessableEntityException(
        initialResponse.body.error.message,
      );
    }

    const poller = getLongRunningPoller(this.client, initialResponse);
    const analyzeResult = await poller.pollUntilDone();

    if (analyzeResult.status !== HttpStatus.OK.toString()) {
      const errorResponseOutput =
        analyzeResult.body as DocumentIntelligenceErrorResponseOutput;
      throw new UnprocessableEntityException(errorResponseOutput.error.message);
    }

    const analyzeResultBody = analyzeResult.body as AnalyzeOperationOutput;

    const documents = analyzeResultBody.analyzeResult?.documents;
    const document = documents?.[0];

    if (!document) {
      throw new UnprocessableEntityException(
        'Expected at least one document in the result.',
      );
    }

    return document;
  }

  private getReceiptItemsFromDocument(
    receiptDocument: AnalyzedDocumentOutput,
  ): ReceiptItemsArray {
    return validateReceiptFields(receiptDocument.fields).Items;
  }

  private async savePurchase(
    purchaseDate: string,
    receiptItems: ReceiptItemsArray,
  ): Promise<PurchaseDto> {
    try {
      return await this.dataSource.transaction(
        async (transactionalEntityManager) => {
          const purchase = new Purchase();
          const products = this.createProductsFromReceiptItems(
            purchase,
            receiptItems,
          );

          purchase.products = products;
          purchase.totalValue = this.calculatePurchaseTotalValue(products);
          purchase.status = PurchaseStatus.PENDING_REVIEW;
          purchase.boughtAt = new Date(purchaseDate);

          return PurchaseDto.fromEntity(
            await transactionalEntityManager.save(purchase),
          );
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private createProductsFromReceiptItems(
    purchase: Purchase,
    receiptItems: ReceiptItemsArray,
  ): Product[] {
    return receiptItems.valueArray.map((item) => {
      const receiptItem = item.valueObject;
      const product = new Product();
      product.code = receiptItem.ProductCode?.valueString;
      product.description = receiptItem.Description?.valueString;
      product.unitValue = receiptItem.Price?.valueCurrency.amount;
      product.unitIdentifier = receiptItem.QuantityUnit?.valueString;
      product.quantity = receiptItem.Quantity?.valueNumber;
      product.totalValue = receiptItem.TotalPrice?.valueCurrency.amount;
      product.purchase = purchase;
      return product;
    });
  }

  private calculatePurchaseTotalValue(products: Product[]): number {
    return products.reduce(
      (prev, curr) => prev + (curr.totalValue ? curr.totalValue : 0),
      0,
    );
  }
}
