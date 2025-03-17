import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PurchaseService } from './services/purchase.service';
import { CreatePurchaseDto } from './dtos/create-purchase.dto';
import { PurchaseDto } from './dtos/purchase.dto';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';

@Controller({ path: '/purchase', version: '1' })
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Receipt file and date of purchase',
    schema: {
      type: 'object',
      required: ['file', 'date'],
      properties: {
        file: {
          type: 'string',
          format: 'binary',
          description: 'The receipt file to upload',
        },
        date: {
          type: 'string',
          example: '2024-02-20',
          description: 'Purchase date in ISO format (YYYY-MM-DD)',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Purchase successfully processed',
    type: PurchaseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Receipt or Date is missing or invalid',
  })
  @ApiResponse({
    status: 422,
    description: 'Receipt is invalid',
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error',
  })
  @UseInterceptors(FileInterceptor('file'))
  async createPurchase(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    if (!file) {
      throw new BadRequestException('Receipt file is required');
    }

    const dto: CreatePurchaseDto = { ...body, file };
    return await this.purchaseService.processAndSavePurchase(dto);
  }
}
