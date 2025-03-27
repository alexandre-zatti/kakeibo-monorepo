import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { Purchase } from '../../entities/purchase.entity';
import { PurchaseStatus } from '../../enums/status.enum';

export class UpdatePurchaseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the purchase',
  })
  @IsNumber()
  @IsPositive()
  id: number;

  @ApiProperty({
    example: 1,
    description:
      'The status of the purchase (e.g., 1 for reviewed, 2 for pending revision)',
  })
  @IsEnum(PurchaseStatus)
  status: number;

  @ApiProperty({
    example: 100.5,
    description: 'The total value of the purchase',
  })
  @IsNumber()
  @IsPositive()
  totalValue: number;

  @ApiProperty({
    example: '2024-02-20T14:30:00.000Z',
    description: 'The date and time when the purchase was made',
  })
  @IsDate()
  @Type(() => Date)
  boughtAt: Date;

  static fromEntity(purchase: Purchase): UpdatePurchaseDto {
    return {
      id: purchase.id,
      status: purchase.status,
      totalValue: purchase.totalValue,
      boughtAt: purchase.boughtAt,
    };
  }
}
