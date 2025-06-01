import { z } from 'zod';
import { Purchase, PurchaseCreate, PurchaseUpdate } from './purchase';

export const Product = z.object({
  id: z.number().int(),
  purchase: Purchase,
  code: z.string(),
  description: z.string(),
  unitValue: z.number(),
  unitIdentifier: z.string(),
  quantity: z.number(),
  totalValue: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const ProductList = z.array(Product);

export const ProductCreate = Product.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  purchase: PurchaseCreate,
});

export const ProductUpdate = ProductCreate.extend({
  id: Product.shape.id,
  purchase: PurchaseUpdate,
});

export type ProductType = z.infer<typeof Product>;
export type ProductCreateType = z.infer<typeof ProductCreate>;
export type ProductUpdateType = z.infer<typeof ProductUpdate>;
