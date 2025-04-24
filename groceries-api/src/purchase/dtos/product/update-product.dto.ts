import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty({
    example: 'PROD123',
    description: 'The unique code of the product',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    example: 'A high-quality product',
    description: 'The description of the product',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 10.99,
    description: 'The unit value (price) of the product',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  unitValue?: number;

  @ApiProperty({
    example: 'UND',
    description: 'The unit identifier (e.g., "UND", "KG")',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  unitIdentifier?: string;

  @ApiProperty({
    example: 5,
    description: 'The quantity of the product',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  @ApiProperty({
    example: 54.95,
    description: 'The total value of the product (unitValue * quantity)',
    nullable: true,
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  totalValue?: number;
}
