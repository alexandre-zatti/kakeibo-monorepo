import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { ApiKeyAuthGuard } from "./shared/guards/auth.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("groceries-api");

  app.enableVersioning({
    type: VersioningType.URI
  });

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(app.get(ApiKeyAuthGuard));

  const config = new DocumentBuilder()
    .setTitle("Groceries Analyzer API")
    .setDescription("Groceries Analyzer API")
    .setVersion("1.0")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("groceries-api", app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
