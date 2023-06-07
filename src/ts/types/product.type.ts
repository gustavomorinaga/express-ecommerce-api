import { z } from 'zod';

// Schemas
import { getProductsSchema } from '@schemas';

export type TProductQuery = z.infer<typeof getProductsSchema>['query'];
