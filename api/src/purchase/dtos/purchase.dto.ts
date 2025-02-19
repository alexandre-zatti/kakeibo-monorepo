import { ProductDto } from '../../product/dtos/product.dto';
import { Purchase } from '../purchase.entity';

export class PurchaseDto {
  id: number;
  status: number;
  totalValue: number;
  boughtAt: Date;
  products: ProductDto[];

  static fromEntity(purchase: Purchase): PurchaseDto {
    return {
      id: purchase.id,
      status: purchase.status,
      totalValue: purchase.totalValue,
      boughtAt: purchase.boughtAt,
      products: purchase.products.map((p) => ProductDto.fromEntity(p)),
    };
  }
}
