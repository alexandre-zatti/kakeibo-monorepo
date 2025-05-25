import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ApiTags } from '@nestjs/swagger';
import { PaginatedProductDto, ProductDto } from './dtos/product/product.dto';

@Crud({
  model: { type: Product },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    join: {
      purchase: {
        eager: true,
      },
    },
  },
  serialize: {
    get: ProductDto,
    getMany: PaginatedProductDto,
  },
})
@ApiTags('Products')
@Controller({ path: 'product', version: '1' })
export class ProductController implements CrudController<ProductDto> {
  constructor(public readonly service: ProductService) {}
}
