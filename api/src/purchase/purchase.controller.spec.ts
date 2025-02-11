import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';

describe('AppController', () => {
  let appController: PurchaseController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PurchaseController],
      providers: [PurchaseService],
    }).compile();

    appController = app.get<PurchaseController>(PurchaseController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
