import { z } from 'zod';

export const Purchase = z.object({
  id: z.number().int(),
  status: z.number(),
  totalValue: z.number(),
  boughtAt: z.string().datetime(),
});

export const PurchaseCreate = Purchase.omit({ id: true });

export const PurchaseUpdate = PurchaseCreate.extend({
  id: Purchase.shape.id,
});

export type PurchaseResponseType = z.infer<typeof Purchase>;
export type PurchaseCreateType = z.infer<typeof PurchaseCreate>;
export type PurchaseUpdateType = z.infer<typeof PurchaseUpdate>;
