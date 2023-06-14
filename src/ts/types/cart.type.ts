import { z } from 'zod';

// Schemas
import { createCartSchema, getCartsSchema, updateCartSchema } from '@schemas';

export type TCartQuery = z.infer<typeof getCartsSchema>['query'];

export type TCartCreate = z.infer<typeof createCartSchema>['body'];

export type TCartUpdate = z.infer<typeof updateCartSchema>['body'];
