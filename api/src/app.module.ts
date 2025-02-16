import { Module } from '@nestjs/common';
import { PurchaseModule } from './purchase/purchase.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(typeOrmConfig.options),
    PurchaseModule,
  ],
})
export class AppModule {}
