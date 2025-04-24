import { ReceiptItemsArray } from '../../src/shared/types/documentReceipt';

export const mockReceiptItemsArray: ReceiptItemsArray = {
  valueArray: [
    {
      valueObject: {
        Description: { valueString: 'Product 1' },
        Price: {
          valueCurrency: {
            amount: 10.99,
            currencyCode: 'USD',
          },
        },
        ProductCode: { valueString: 'P001' },
        Quantity: { valueNumber: 2 },
        QuantityUnit: { valueString: 'pcs' },
        TotalPrice: {
          valueCurrency: {
            amount: 21.98,
            currencyCode: 'USD',
          },
        },
      },
    },
    {
      valueObject: {
        Description: { valueString: 'Product 2' },
        Price: {
          valueCurrency: {
            amount: 5.99,
            currencyCode: 'USD',
          },
        },
        ProductCode: { valueString: 'P002' },
        Quantity: { valueNumber: 3 },
        QuantityUnit: { valueString: 'pcs' },
        TotalPrice: {
          valueCurrency: {
            amount: 17.97,
            currencyCode: 'USD',
          },
        },
      },
    },
  ],
};
