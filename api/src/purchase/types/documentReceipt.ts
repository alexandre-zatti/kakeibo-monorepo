import { z } from 'zod';

const CurrencySchema = z.object({
  valueCurrency: z.object({
    amount: z.number(),
    currencyCode: z.string(),
  }),
});

const StringSchema = z.object({
  valueString: z.string(),
});

const NumberSchema = z.object({
  valueNumber: z.number(),
});

const ReceiptItemSchema = z.object({
  valueObject: z.object({
    Description: StringSchema,
    Price: CurrencySchema,
    ProductCode: StringSchema,
    Quantity: NumberSchema,
    QuantityUnit: StringSchema,
    TotalPrice: CurrencySchema,
  }),
});

const ReceiptItemArraySchema = z.object({
  valueArray: z.array(ReceiptItemSchema),
});

const ReceiptFieldsSchema = z.object({
  Items: ReceiptItemArraySchema,
});

export type ReceiptItem = z.infer<typeof ReceiptItemSchema>;
export type ReceiptItemsArray = z.infer<typeof ReceiptItemArraySchema>;
export type ReceiptFields = z.infer<typeof ReceiptFieldsSchema>;

export function validateReceiptFields(data: unknown): ReceiptFields {
  const result = ReceiptFieldsSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid receipt data: ${result.error.message}`);
  }

  return result.data;
}
