import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePurchaseDto {
  @ApiProperty({
    example: '2024-02-20',
    description: 'Purchase date in ISO format (YYYY-MM-DD)',
  })
  @IsNotEmpty({ message: 'Date is required' })
  @IsDateString({}, { message: 'Date must be a valid ISO date string' })
  date: string;

  file: Express.Multer.File;

  constructor(date: string, file: Express.Multer.File) {
    this.file = file;
    this.date = date;
  }
}
