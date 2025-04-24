import { Module } from '@nestjs/common';
import { PurchaseModule } from './purchase/purchase.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from '../typeorm.config';
import { DocumentInteligenceModule } from './document-inteligence/document-inteligence.module';
import { ApiKeyAuthGuard } from './shared/guards/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '../../.env' }),
    TypeOrmModule.forRoot(typeOrmConfig.options),
    PurchaseModule,
    DocumentInteligenceModule,
  ],
  providers: [ApiKeyAuthGuard],
})
export class AppModule {}
