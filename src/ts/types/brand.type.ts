import { z } from 'zod';

// Schemas
import { createBrandSchema, getBrandsSchema, updateBrandSchema } from '@schemas';

export type TBrandQuery = z.infer<typeof getBrandsSchema>['query'];

export type TBrandCreate = z.infer<typeof createBrandSchema>['body'];

export type TBrandUpdate = z.infer<typeof updateBrandSchema>['body'];
