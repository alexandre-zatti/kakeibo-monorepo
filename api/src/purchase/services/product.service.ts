import { Injectable } from '@nestjs/common';
import { Purchase } from '../entities/purchase.entity';
import { ReceiptItemsArray } from '../../shared/types/documentReceipt';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductService {
  constructor() {}

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
