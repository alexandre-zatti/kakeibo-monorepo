import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

import { PurchaseDto } from '../purchase/purchase.dto';

export class ProductDto {
  @ApiProperty({ example: 1, description: 'The ID of the product' })
  @Expose()
  id: number;

  @ApiProperty({
    type: () => PurchaseDto,
    description: 'The purchase associated with this product',
  })
  @Expose()
  @Type(() => PurchaseDto)
  purchase: PurchaseDto;

  @Exclude()
  purchaseId: number;

  @ApiPropertyOptional({
    example: 'PROD123',
    description: 'The unique code of the product',
  })
  @Expose()
  code?: string;

  @ApiPropertyOptional({
    example: 'A high-quality product',
    description: 'The description of the product',
  })
  @Expose()
  description?: string;

  @ApiPropertyOptional({
    example: 10.99,
    description: 'The unit value (price) of the product',
  })
  @Expose()
  unitValue?: number;

  @ApiPropertyOptional({
    example: 'UND',
    description: 'The unit identifier (e.g., "UND", "KG")',
  })
  @Expose()
  unitIdentifier?: string;

  @ApiPropertyOptional({
    example: 5,
    description: 'The quantity of the product',
  })
  @Expose()
  quantity?: number;

  @ApiPropertyOptional({
    example: 54.95,
    description: 'The total value of the product (unitValue * quantity)',
  })
  @Expose()
  totalValue?: number;

  @ApiProperty({
    example: '2025-02-20T20:41:00.000Z',
    description: 'Creation date',
  })
  @Expose()
  createdAt: Date;

  @ApiProperty({
    example: '2025-02-20T20:41:00.000Z',
    description: 'Last update date',
  })
  @Expose()
  updatedAt: Date;
}

export class PaginatedProductDto {
  @ApiProperty({ type: [ProductDto], description: 'Array of products' })
  @Expose()
  @Type(() => ProductDto)
  data: ProductDto[];

  @ApiProperty({
    example: 1,
    description: 'Total count of items on current page',
  })
  @Expose()
  count: number;

  @ApiProperty({ example: 934, description: 'Total count of all items' })
  @Expose()
  total: number;

  @ApiProperty({ example: 1, description: 'Current page number' })
  @Expose()
  page: number;

  @ApiProperty({ example: 934, description: 'Total number of pages' })
  @Expose()
  pageCount: number;
}
