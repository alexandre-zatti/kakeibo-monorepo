import { NestFactory } from '@nestjs/core';
import { PurchaseModule } from './purchase/purchase.module';

async function bootstrap() {
  const app = await NestFactory.create(PurchaseModule);
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
