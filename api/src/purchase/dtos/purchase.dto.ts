import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from './product.dto';
import { Purchase } from '../entities/purchase.entity';

export class PurchaseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the purchase',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description:
      'The status of the purchase (e.g., 1 for reviewed, 2 for pending revision)',
  })
  status: number;

  @ApiProperty({
    example: 100.5,
    description: 'The total value of the purchase',
  })
  totalValue: number;

  @ApiProperty({
    example: '2024-02-20T14:30:00.000Z',
    description: 'The date and time when the purchase was made',
  })
  boughtAt: Date;

  @ApiProperty({
    type: [ProductDto],
    description: 'The list of products included in the purchase',
  })
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
