import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { PurchaseModule } from '../src/purchase/purchase.module';
import { DocumentInteligenceService } from '../src/document-inteligence/document-inteligence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from '../src/purchase/entities/purchase.entity';
import { mockReceiptItemsArray } from './mocks/mockReceiptItemsArray';
import { DocumentInteligenceModule } from '../src/document-inteligence/document-inteligence.module';
import { Product } from '../src/purchase/entities/product.entity';
import { PurchaseStatus } from '../src/purchase/enums/status.enum';
import { PurchaseDto } from '../src/purchase/dtos/purchase.dto';

describe('PurchaseController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'sqlite',
          database: ':memory:',
          dropSchema: true,
          entities: [Purchase, Product],
          synchronize: true,
          logging: true,
        }),
        TypeOrmModule.forFeature([Purchase, Product]),
        PurchaseModule,
        DocumentInteligenceModule,
      ],
    })
      .overrideProvider(DocumentInteligenceService)
      .useValue({
        extractItemsFromReceiptDocument: jest
          .fn()
          .mockResolvedValue(mockReceiptItemsArray),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new purchase (POST /purchase)', async () => {
    const mockFile = Buffer.from('mock file content');
    const mockDate = '2024-02-20';

    const response = await request(app.getHttpServer())
      .post('/purchase')
      .field('date', mockDate)
      .attach('file', mockFile, 'receipt.jpg')
      .expect(201);

    const responseBody = response.body as PurchaseDto;

    expect(responseBody).toHaveProperty('id');
    expect(typeof responseBody.id).toBe('number');

    expect(responseBody).toHaveProperty(
      'status',
      PurchaseStatus.PENDING_REVIEW,
    );

    expect(responseBody).toHaveProperty('totalValue');
    expect(typeof responseBody.totalValue).toBe('number');
    expect(responseBody.totalValue).toBeGreaterThan(0);

    expect(responseBody).toHaveProperty('boughtAt');
    expect(new Date(responseBody.boughtAt)).toBeInstanceOf(Date);
    expect(new Date(responseBody.boughtAt).toString()).not.toBe('Invalid Date');

    expect(responseBody).toHaveProperty('products');
    expect(responseBody.products).toHaveLength(2);

    responseBody.products.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('code');
      expect(product).toHaveProperty('description');
      expect(product).toHaveProperty('unitValue');
      expect(product).toHaveProperty('unitIdentifier');
      expect(product).toHaveProperty('quantity');
      expect(product).toHaveProperty('totalValue');
    });
  });
});
