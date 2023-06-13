import { z } from 'zod';

// Schemas
import { createFavoriteSchema, updateFavoriteSchema } from '@schemas';

export type TFavoriteCreate = z.infer<typeof createFavoriteSchema>['body'];

export type TFavoriteUpdate = z.infer<typeof updateFavoriteSchema>['body'];
