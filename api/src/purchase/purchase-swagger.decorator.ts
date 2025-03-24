import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { ApiCommonResponses } from '../shared/decorators/swagger.decorator';
import { PurchaseDto } from './dtos/purchase.dto';
import { UpdatePurchaseDto } from './dtos/update-purchase.dto';

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

export function ApiUpdatePurchaseDocs() {
  return applyDecorators(
    ApiOkResponse({
      description: 'Purchase updated successfully',
      type: UpdatePurchaseDto,
    }),
    ApiCommonResponses(),
  );
}
