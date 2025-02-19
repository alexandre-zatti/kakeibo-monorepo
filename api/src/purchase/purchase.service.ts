import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
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
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Repository } from 'typeorm';
import { Product } from '../product/product.entity';
import { PurchaseDto } from './dtos/purchase.dto';

@Injectable()
export class PurchaseService {
  private readonly client: DocumentIntelligenceClient;

  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    private readonly configService: ConfigService,
  ) {
    const diEndpoint = this.configService.get<string>('DI_ENDPOINT');
    const diKey = this.configService.get<string>('DI_KEY');

    if (!diEndpoint || !diKey) {
      throw new UnauthorizedException();
    }

    this.client = createClient(diEndpoint, new AzureKeyCredential(diKey));
  }

  async processAndSavePurchase(
    receiptFile: Express.Multer.File,
  ): Promise<PurchaseDto | undefined> {
    try {
      const receiptDocument = await this.analyzeReceiptDocument(receiptFile);
      const receiptItems = this.getReceiptItemsFromDocument(receiptDocument);
      return await this.savePurchase(receiptItems);
    } catch (error) {
      console.log(error);
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
      throw new Error(initialResponse.body.error.message);
    }

    const poller = getLongRunningPoller(this.client, initialResponse);
    const analyzeResult = await poller.pollUntilDone();

    if (analyzeResult.status !== HttpStatus.OK.toString()) {
      const errorResponseOutput =
        analyzeResult.body as DocumentIntelligenceErrorResponseOutput;
      throw new Error(errorResponseOutput.error.message);
    }

    const analyzeResultBody = analyzeResult.body as AnalyzeOperationOutput;

    const documents = analyzeResultBody.analyzeResult?.documents;
    const document = documents?.[0];

    if (!document) {
      throw new Error('Expected at least one document in the result.');
    }

    return document;
  }

  private getReceiptItemsFromDocument(
    receiptDocument: AnalyzedDocumentOutput,
  ): ReceiptItemsArray {
    return validateReceiptFields(receiptDocument.fields).Items;
  }

  private async savePurchase(
    receiptItems: ReceiptItemsArray,
  ): Promise<PurchaseDto> {
    const purchase = new Purchase();
    purchase.status = 1;
    purchase.totalValue = 123.23;
    purchase.boughtAt = new Date();

    const product = new Product();
    product.code =
      receiptItems.valueArray[0].valueObject.ProductCode.valueString;
    product.description =
      receiptItems.valueArray[0].valueObject.Description.valueString;
    product.unitValue =
      receiptItems.valueArray[0].valueObject.Price.valueCurrency.amount;
    product.unitIdentifier =
      receiptItems.valueArray[0].valueObject.QuantityUnit.valueString;
    product.quantity =
      receiptItems.valueArray[0].valueObject.Quantity.valueNumber;
    product.totalValue =
      receiptItems.valueArray[0].valueObject.TotalPrice.valueCurrency.amount;
    product.purchase = purchase;

    purchase.products = [product];

    return PurchaseDto.fromEntity(await this.purchaseRepository.save(purchase));
  }
}
