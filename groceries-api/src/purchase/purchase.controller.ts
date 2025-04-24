import {
  applyDecorators,
  BadRequestException,
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Purchase } from './entities/purchase.entity';
import { PurchaseService } from './services/purchase.service';
import { CreatePurchaseDto } from './dtos/purchase/create-purchase.dto';
import { UpdatePurchaseDto } from './dtos/purchase/update-purchase.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PurchaseDto } from './dtos/purchase/purchase.dto';
import { ApiCommonResponses } from '../shared/decorators/swagger.decorator';

@Crud({
  model: {
    type: Purchase,
  },
  dto: {
    create: CreatePurchaseDto,
    update: UpdatePurchaseDto,
  },
  routes: {
    only: ['getManyBase', 'getOneBase', 'updateOneBase', 'deleteOneBase'],
  },
})
@ApiTags('purchase')
@Controller({ path: 'purchase', version: '1' })
export class PurchaseController implements CrudController<Purchase> {
  constructor(public service: PurchaseService) {}

  @Post()
  @ApiCreatePurchaseDocs()
  @UseInterceptors(FileInterceptor('file'))
  async createOneCustom(
    @Body() body: CreatePurchaseDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<PurchaseDto> {
    if (!file) {
      throw new BadRequestException('Receipt file is required');
    }

    const dto: CreatePurchaseDto = { ...body, file };
    return this.service.processReceiptAndCreatePurchase(dto);
  }
}

function ApiCreatePurchaseDocs() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create a single Purchase',
    }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
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
    }),
    ApiCreatedResponse({
      description: 'Purchase successfully created',
      type: PurchaseDto,
    }),
    ApiCommonResponses(),
  );
}
