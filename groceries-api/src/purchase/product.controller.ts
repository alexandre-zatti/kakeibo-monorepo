import { Controller } from '@nestjs/common';
import { Crud, CrudController } from '@dataui/crud';
import { Product } from './entities/product.entity';
import { ProductService } from './services/product.service';
import { ApiTags } from '@nestjs/swagger';

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
})
@ApiTags('Products')
@Controller({ path: 'product', version: '1' })
export class ProductController implements CrudController<Product> {
  constructor(public readonly service: ProductService) {}
}
