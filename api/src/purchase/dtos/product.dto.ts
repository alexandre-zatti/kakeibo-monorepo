import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../entities/product.entity';

export class ProductDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the product',
  })
  id: number;

  @ApiProperty({
    example: 1,
    description: 'The ID of the purchase associated with this product',
  })
  purchase_id: number;

  @ApiProperty({
    example: 'PROD123',
    description: 'The unique code of the product',
    nullable: true,
  })
  code?: string;

  @ApiProperty({
    example: 'A high-quality product',
    description: 'The description of the product',
    nullable: true,
  })
  description?: string;

  @ApiProperty({
    example: 10.99,
    description: 'The unit value (price) of the product',
    nullable: true,
  })
  unitValue?: number;

  @ApiProperty({
    example: 'UND',
    description: 'The unit identifier (e.g., "UND", "KG")',
    nullable: true,
  })
  unitIdentifier?: string;

  @ApiProperty({
    example: 5,
    description: 'The quantity of the product',
    nullable: true,
  })
  quantity?: number;

  @ApiProperty({
    example: 54.95,
    description: 'The total value of the product (unitValue * quantity)',
    nullable: true,
  })
  totalValue?: number;

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
