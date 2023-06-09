import { z } from 'zod';

// Schemas
import { getOrdersSchema } from '@schemas';

export type TOrderQuery = z.infer<typeof getOrdersSchema>['query'];
