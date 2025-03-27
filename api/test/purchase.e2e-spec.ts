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
import { PurchaseDto } from '../src/purchase/dtos/purchase/purchase.dto';
import { UpdatePurchaseDto } from '../src/purchase/dtos/purchase/update-purchase.dto';
import { UpdateProductDto } from '../src/purchase/dtos/product/update-product.dto';

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

  it('should create a new purchase', async () => {
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
  });

  it('should update a purchase', async () => {
    const mockFile = Buffer.from('mock file content');
    const mockDate = '2024-02-20';

    const responseCreate = await request(app.getHttpServer())
      .post('/purchase')
      .field('date', mockDate)
      .attach('file', mockFile, 'receipt.jpg')
      .expect(201);

    const createPurchaseResponseBody = responseCreate.body as PurchaseDto;

    const responseUpdate = await request(app.getHttpServer())
      .put(`/purchase/${createPurchaseResponseBody.id}`)
      .send({
        ...createPurchaseResponseBody,
        status: PurchaseStatus.REVIEWED,
      } as UpdatePurchaseDto)
      .expect(200);

    const updatePurchaseResponseBody = responseUpdate.body as UpdatePurchaseDto;

    expect(updatePurchaseResponseBody).toHaveProperty(
      'status',
      PurchaseStatus.REVIEWED,
    );
  });

  it('should update a product from a purchase', async () => {
    const mockFile = Buffer.from('mock file content');
    const mockDate = '2024-02-20';

    const responseCreate = await request(app.getHttpServer())
      .post('/purchase')
      .field('date', mockDate)
      .attach('file', mockFile, 'receipt.jpg')
      .expect(201);

    const createPurchaseResponseBody = responseCreate.body as PurchaseDto;

    const responseGetProducts = await request(app.getHttpServer())
      .get(`/purchase/${createPurchaseResponseBody.id}/products`)
      .expect(200);

    const getPurchaseProductsResponseBody =
      responseGetProducts.body as PurchaseDto[];
    const productToBeUpdated = getPurchaseProductsResponseBody[0];

    const responseUpdate = await request(app.getHttpServer())
      .put(
        `/purchase/${createPurchaseResponseBody.id}/product/${productToBeUpdated.id}`,
      )
      .send({
        ...productToBeUpdated,
        totalValue: productToBeUpdated.totalValue
          ? productToBeUpdated.totalValue + 1
          : 1,
      } as UpdateProductDto)
      .expect(200);

    const updateProductResponseBody = responseUpdate.body as UpdateProductDto;

    expect(updateProductResponseBody).toHaveProperty(
      'totalValue',
      productToBeUpdated.totalValue ? productToBeUpdated.totalValue + 1 : 1,
    );

    const responseGet = await request(app.getHttpServer())
      .get(`/purchase/${createPurchaseResponseBody.id}`)
      .expect(200);

    const purchaseGetBody = responseGet.body as PurchaseDto;

    expect(purchaseGetBody).toHaveProperty(
      'totalValue',
      createPurchaseResponseBody.totalValue + 1,
    );
  });
});
