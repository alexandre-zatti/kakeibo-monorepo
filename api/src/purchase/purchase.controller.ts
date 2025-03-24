import {
  BadRequestException,
  Body,
  Controller,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PurchaseService } from './services/purchase.service';
import { CreatePurchaseDto } from './dtos/create-purchase.dto';
import { PurchaseDto } from './dtos/purchase.dto';
import {
  ApiCreatePurchaseDocs,
  ApiUpdatePurchaseDocs,
} from './purchase-swagger.decorator';
import { UpdatePurchaseDto } from './dtos/update-purchase.dto';

@Controller({ path: '/purchase', version: '1' })
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @ApiCreatePurchaseDocs()
  @UseInterceptors(FileInterceptor('file'))
  async createPurchase(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreatePurchaseDto,
  ): Promise<PurchaseDto> {
    if (!file) {
      throw new BadRequestException('Receipt file is required');
    }

    const dto: CreatePurchaseDto = { ...body, file };
    return await this.purchaseService.processReceiptAndCreatePurchase(dto);
  }

  @Put(':purchaseId')
  @ApiUpdatePurchaseDocs()
  async updatePurchase(
    @Param('purchaseId') purchaseId: number,
    @Body() body: UpdatePurchaseDto,
  ): Promise<UpdatePurchaseDto> {
    return await this.purchaseService.updatePurchase(purchaseId, body);
  }
}
