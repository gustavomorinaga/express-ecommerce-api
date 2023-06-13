import { z } from 'zod';

// Schemas
import { createProductSchema, getProductsSchema, updateProductSchema } from '@schemas';

export type TProductQuery = z.infer<typeof getProductsSchema>['query'];

export type TProductCreate = z.infer<typeof createProductSchema>['body'];

export type TProductUpdate = z.infer<typeof updateProductSchema>['body'];
