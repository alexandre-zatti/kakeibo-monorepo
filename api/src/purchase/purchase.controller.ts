import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dtos/purchase.dto';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async createPurchase(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PurchaseDto | undefined> {
    return await this.purchaseService.processAndSavePurchase(file);
  }
}
