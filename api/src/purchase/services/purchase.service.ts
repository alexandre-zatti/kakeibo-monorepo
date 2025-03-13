import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ReceiptItemsArray } from '../../shared/types/documentReceipt';
import { InjectDataSource } from '@nestjs/typeorm';
import { Purchase } from '../entities/purchase.entity';
import { DataSource } from 'typeorm';
import { Product } from '../entities/product.entity';
import { PurchaseDto } from '../dtos/purchase.dto';
import { CreatePurchaseDto } from '../dtos/create-purchase.dto';
import { PurchaseStatus } from '../enums/status.enum';
import { DocumentInteligenceService } from '../../document-inteligence/document-inteligence.service';
import { ProductService } from './product.service';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly documentInteligenceService: DocumentInteligenceService,
    private readonly productService: ProductService,
  ) {}

  async processAndSavePurchase(
    createPurchaseDto: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    try {
      const receiptItems: ReceiptItemsArray =
        await this.documentInteligenceService.extractItemsFromReceiptDocument(
          createPurchaseDto.file,
        );
      return await this.savePurchase(createPurchaseDto.date, receiptItems);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async savePurchase(
    purchaseDate: string,
    receiptItems: ReceiptItemsArray,
  ): Promise<PurchaseDto> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private calculatePurchaseTotalValue(products: Product[]): number {
    return products.reduce(
      (prev, curr) => prev + (curr.totalValue ? curr.totalValue : 0),
      0,
    );
  }
}
