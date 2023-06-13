import { z } from 'zod';

// Schemas
import {
	createCategorySchema,
	getCategoriesSchema,
	updateCategorySchema,
} from '@schemas';

export type TCategoryQuery = z.infer<typeof getCategoriesSchema>['query'];

export type TCategoryCreate = z.infer<typeof createCategorySchema>['body'];

export type TCategoryUpdate = z.infer<typeof updateCategorySchema>['body'];
