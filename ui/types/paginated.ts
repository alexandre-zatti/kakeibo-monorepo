import { z } from 'zod';

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    data: z.array(item),
    count: z.number(),
    total: z.number(),
    page: z.number(),
    pageCount: z.number(),
  });
