import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dtos/product/create-product.dto';
import { UpdateProductDto } from './dtos/product/update-product.dto';

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
})
@ApiTags('Purchase Products')
@Controller({ path: 'purchase/:purchaseId/product', version: '1' })
export class PurchaseProductsController implements CrudController<Product> {
  constructor(public service: ProductService) {}
}
