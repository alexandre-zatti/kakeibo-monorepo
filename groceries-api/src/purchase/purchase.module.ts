import { Module } from '@nestjs/common';
import { PurchaseService } from './services/purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { ProductService } from './services/product.service';
import { DocumentInteligenceModule } from '../document-inteligence/document-inteligence.module';
import { Product } from './entities/product.entity';
import { PurchaseProductsController } from './purchase-product.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Purchase, Product]),
    DocumentInteligenceModule,
  ],
  controllers: [PurchaseController, PurchaseProductsController],
  providers: [PurchaseService, ProductService],
})
export class PurchaseModule {}
