import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PurchaseService } from './purchase.service';

@Controller()
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  createPurchase(@UploadedFile() file: Express.Multer.File): object {
    return this.purchaseService.createPurchase(file);
  }
}
