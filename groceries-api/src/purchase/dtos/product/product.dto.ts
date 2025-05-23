import { ApiProperty } from '@nestjs/swagger';
import { IsInstance, IsNumber, IsPositive, IsString } from 'class-validator';
import { PurchaseDto } from '../purchase/purchase.dto';

export class ProductDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the product',
  })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: PurchaseDto,
    description: 'The ID of the purchase associated with this product',
  })
  @IsInstance(PurchaseDto)
  purchase: PurchaseDto;

  @ApiProperty({
    example: 'PROD123',
    description: 'The unique code of the product',
    nullable: true,
  })
  @IsString()
  code?: string;

  @ApiProperty({
    example: 'A high-quality product',
    description: 'The description of the product',
    nullable: true,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    example: 10.99,
    description: 'The unit value (price) of the product',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  unitValue?: number;

  @ApiProperty({
    example: 'UND',
    description: 'The unit identifier (e.g., "UND", "KG")',
    nullable: true,
  })
  @IsString()
  unitIdentifier?: string;

  @ApiProperty({
    example: 5,
    description: 'The quantity of the product',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  quantity?: number;

  @ApiProperty({
    example: 54.95,
    description: 'The total value of the product (unitValue * quantity)',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  totalValue?: number;
}
