import { Product } from '../product.entity';

export class ProductDto {
  id: number;
  purchase_id: number;
  code: string;
  description: string;
  unitValue: number;
  unitIdentifier: string;
  quantity: number;
  totalValue: number;

  static fromEntity(product: Product): ProductDto {
    return {
      id: product.id,
      purchase_id: product.purchase.id,
      code: product.code,
      description: product.description,
      unitValue: product.unitValue,
      unitIdentifier: product.unitIdentifier,
      quantity: product.quantity,
      totalValue: product.totalValue,
    };
  }
}
