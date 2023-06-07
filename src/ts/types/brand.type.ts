import { z } from 'zod';

// Schemas
import { getBrandsSchema } from '@schemas';

export type TBrandQuery = z.infer<typeof getBrandsSchema>['query'];
