import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReceiptItemsArray } from '../../shared/types/documentReceipt';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../entities/purchase.entity';
import { Product } from '../entities/product.entity';
import { PurchaseDto } from '../dtos/purchase/purchase.dto';
import { CreatePurchaseDto } from '../dtos/purchase/create-purchase.dto';
import { PurchaseStatus } from '../enums/status.enum';
import { DocumentInteligenceService } from '../../document-inteligence/document-inteligence.service';
import { ProductService } from './product.service';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PurchaseService extends TypeOrmCrudService<Purchase> {
  constructor(
    @InjectRepository(Purchase) purchaseRepository: Repository<Purchase>,
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly documentInteligenceService: DocumentInteligenceService,
    private readonly productService: ProductService,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(purchaseRepository);
  }

  async processReceiptAndCreatePurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    try {
      const receiptItems: ReceiptItemsArray =
        await this.documentInteligenceService.extractItemsFromReceiptDocument(
          createPurchaseDto.file,
        );
      return await this.savePurchaseWithProducts(
        createPurchaseDto.date,
        receiptItems,
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async savePurchaseWithProducts(
    purchaseDate: string,
    receiptItems: ReceiptItemsArray,
  ): Promise<PurchaseDto> {
    return await this.dataSource.transaction(
      async (transactionalEntityManager) => {
        const purchase = new Purchase();
        const products = this.productService.createProductsFromReceiptItems(
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
  }

  private calculatePurchaseTotalValue(products: Product[]): number {
    return products.reduce(
      (prev, curr) => prev + (curr.totalValue ? curr.totalValue : 0),
      0,
    );
  }
}
