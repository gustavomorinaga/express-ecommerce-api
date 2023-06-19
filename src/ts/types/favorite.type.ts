import { z } from 'zod';

// Schemas
import { createFavoriteSchema, getFavoritesSchema, updateFavoriteSchema } from '@schemas';

export type TFavoriteQuery = z.infer<typeof getFavoritesSchema>['query'];

export type TFavoriteCreate = z.infer<typeof createFavoriteSchema>['body'];

export type TFavoriteUpdate = z.infer<typeof updateFavoriteSchema>['body'];
