import { z } from 'zod';

// Schemas
import { createCartSchema, updateCartSchema } from '@schemas';

export type TCartCreate = z.infer<typeof createCartSchema>['body'];

export type TCartUpdate = z.infer<typeof updateCartSchema>['body'];
