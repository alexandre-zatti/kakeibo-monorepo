import { Module } from '@nestjs/common';
import { PurchaseService } from './services/purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { ProductService } from './services/product.service';
import { DocumentInteligenceModule } from '../document-inteligence/document-inteligence.module';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase]), DocumentInteligenceModule],
  controllers: [PurchaseController],
  providers: [PurchaseService, ProductService],
})
export class PurchaseModule {}
