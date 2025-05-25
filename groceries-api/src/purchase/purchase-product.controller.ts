import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/product/create-product.dto';
import { UpdateProductDto } from './dtos/product/update-product.dto';
import {
  PaginatedPurchaseProductDto,
  PurchaseProductDto,
} from './dtos/purchase/purchase-product.dto';
import { ProductDto } from './dtos/product/product.dto';

@Crud({
  model: { type: Product },
  dto: {
    create: CreateProductDto,
    update: UpdateProductDto,
  },
  params: {
    purchaseId: {
      field: 'purchaseId',
      type: 'number',
    },
    id: {
      field: 'id',
      type: 'number',
      primary: true,
    },
  },
  routes: {
    only: [
      'getManyBase',
      'getOneBase',
      'updateOneBase',
      'deleteOneBase',
      'createOneBase',
    ],
  },
  serialize: {
    get: PurchaseProductDto,
    getMany: PaginatedPurchaseProductDto,
  },
})
@ApiTags('Purchase Products')
@Controller({ path: 'purchase/:purchaseId/product', version: '1' })
export class PurchaseProductsController implements CrudController<ProductDto> {
  constructor(public service: ProductService) {}
}
