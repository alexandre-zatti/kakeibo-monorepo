import { ApiProperty } from '@nestjs/swagger';
import { Purchase } from '../../entities/purchase.entity';
import { IsDate, IsEnum, IsNumber, IsPositive } from 'class-validator';
import { PurchaseStatus } from '../../enums/status.enum';
import { Type } from 'class-transformer';

export class PurchaseDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the purchase',
  })
  @IsPositive()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 1,
    description:
      'The status of the purchase (e.g., 1 for reviewed, 2 for pending revision)',
  })
  @IsPositive()
  @IsNumber()
  @IsEnum(PurchaseStatus)
  status: number;

  @ApiProperty({
    example: 100.5,
    description: 'The total value of the purchase',
  })
  @IsPositive()
  @IsNumber()
  totalValue: number;

  @ApiProperty({
    example: '2024-02-20T14:30:00.000Z',
    description: 'The date and time when the purchase was made',
  })
  @IsDate()
  @Type(() => Date)
  boughtAt: Date;

  static fromEntity(purchase: Purchase): PurchaseDto {
    return {
      id: purchase.id,
      status: purchase.status,
      totalValue: purchase.totalValue,
      boughtAt: purchase.boughtAt,
    };
  }

  static fromEntityList(purchases: Purchase[]): PurchaseDto[] {
    return purchases.map((purchase) => {
      return {
        id: purchase.id,
        status: purchase.status,
        totalValue: purchase.totalValue,
        boughtAt: purchase.boughtAt,
      };
    });
  }
}
