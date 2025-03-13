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
    Description: StringSchema.optional(),
    Price: CurrencySchema.optional(),
    ProductCode: StringSchema.optional(),
    Quantity: NumberSchema.optional(),
    QuantityUnit: StringSchema.optional(),
    TotalPrice: CurrencySchema.optional(),
  }),
});

const ReceiptItemArraySchema = z.object({
  valueArray: z.array(ReceiptItemSchema),
});

const ReceiptFieldsSchema = z.object({
  Items: ReceiptItemArraySchema,
});

export type ReceiptItemsArray = z.infer<typeof ReceiptItemArraySchema>;
export type ReceiptFields = z.infer<typeof ReceiptFieldsSchema>;

export function validateReceiptFields(data: unknown): ReceiptFields {
  const result = ReceiptFieldsSchema.safeParse(data);

  if (!result.success) {
    throw new Error(`Invalid receipt data: ${result.error.message}`);
  }

  return result.data;
}
