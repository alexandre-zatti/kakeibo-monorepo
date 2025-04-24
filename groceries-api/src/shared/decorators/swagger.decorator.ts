import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

export function ApiCommonResponses() {
  return applyDecorators(
    ApiBadRequestResponse({ description: 'Bad request' }),
    ApiNotFoundResponse({ description: 'Resource not found' }),
    ApiInternalServerErrorResponse({ description: 'Internal server error' }),
  );
}
