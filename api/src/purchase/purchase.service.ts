import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class PurchaseService {
  constructor(private readonly httpService: HttpService) {}

  async createPurchase(file: Express.Multer.File): Promise<object> {
    await this.processReceiptFile(file.buffer);
    return { test: 'Hello World!' };
  }

  private async processReceiptFile(file: Buffer): Promise<AxiosResponse<any>> {
    const formData = new FormData();
    formData.append('file', new Blob([file]));

    const response = await firstValueFrom(
      this.httpService.post(
        'https://groceries.zatti.tech/api/receipt/process',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'X-API-KEY': '@Alexandre12',
          },
        },
      ),
    );

    console.log(response);
    return response;
  }
}
