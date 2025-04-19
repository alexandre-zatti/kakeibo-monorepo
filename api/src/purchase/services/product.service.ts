import { Injectable } from '@nestjs/common';
import { Purchase } from '../entities/purchase.entity';
import { ReceiptItemsArray } from '../../shared/types/documentReceipt';
import { Product } from '../entities/product.entity';
import { TypeOrmCrudService } from '@dataui/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends TypeOrmCrudService<Product> {
  constructor(
    @InjectRepository(Product) productRepository: Repository<Product>,
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super(productRepository);
  }

  createProductsFromReceiptItems(
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
}
