import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PurchaseService } from './services/purchase.service';
import { CreatePurchaseDto } from './dtos/purchase/create-purchase.dto';
import { PurchaseDto } from './dtos/purchase/purchase.dto';
import {
  ApiCreatePurchaseDocs,
  ApiGetPurchaseDocs,
  ApiGetPurchaseProductsDocs,
  ApiUpdatePurchaseDocs,
  ApiUpdatePurchaseProductDocs,
} from './purchase-swagger.decorator';
import { UpdatePurchaseDto } from './dtos/purchase/update-purchase.dto';
import { UpdateProductDto } from './dtos/product/update-product.dto';
import { ProductDto } from './dtos/product/product.dto';

@Controller({ path: '/purchase', version: '1' })
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @Get(':purchaseId')
  @ApiGetPurchaseDocs()
  async getPurchase(
    @Param('purchaseId') purchaseId: number,
  ): Promise<PurchaseDto> {
    return this.purchaseService.getPurchaseById(purchaseId);
  }

  @Get(':purchaseId/products')
  @ApiGetPurchaseProductsDocs()
  async getPurchaseProducts(
    @Param('purchaseId') purchaseId: number,
  ): Promise<ProductDto[]> {
    return this.purchaseService.getProductsByPurchaseId(purchaseId);
  }

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

  @Put(':purchaseId/product/:productId')
  @ApiUpdatePurchaseProductDocs()
  async updatePurchaseProduct(
    @Param('purchaseId') purchaseId: number,
    @Param('productId') productId: number,
    @Body() body: UpdateProductDto,
  ): Promise<UpdateProductDto> {
    return await this.purchaseService.updatePurchaseProduct(
      purchaseId,
      productId,
      body,
    );
  }
}
