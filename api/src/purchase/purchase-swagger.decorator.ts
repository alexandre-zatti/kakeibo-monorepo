import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ApiCommonResponses } from '../shared/decorators/swagger.decorator';
import { PurchaseDto } from './dtos/purchase/purchase.dto';
import { UpdatePurchaseDto } from './dtos/purchase/update-purchase.dto';
import { UpdateProductDto } from './dtos/product/update-product.dto';
import { ProductDto } from './dtos/product/product.dto';

export function ApiCreatePurchaseDocs() {
  return applyDecorators(
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

export function ApiGetPurchaseDocs() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Purchase found successfully',
      type: PurchaseDto,
    }),
    ApiCommonResponses(),
  );
}

export function ApiGetPurchaseProductsDocs() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Products from purchase found successfully',
      type: [ProductDto],
    }),
    ApiCommonResponses(),
  );
}

export function ApiUpdatePurchaseDocs() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Purchase updated successfully',
      type: UpdatePurchaseDto,
    }),
    ApiCommonResponses(),
  );
}

export function ApiUpdatePurchaseProductDocs() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Product updated successfully',
      type: UpdateProductDto,
    }),
    ApiCommonResponses(),
  );
}
