import { z } from 'zod';

// Schemas
import { objectIdGeneric, queryGeneric } from '@schemas';

// Generics
export const baseCategoryGeneric = z.object({
	name: z.string(),
	description: z.string().optional(),
});

export const categoryGeneric = baseCategoryGeneric.extend({
	subCategories: z.array(baseCategoryGeneric).default([]),
});

// Schemas
export const getCategoriesSchema = z.object({
	query: z
		.object({
			name: z.string().optional(),
			sortBy: z.enum(['name']).default('name'),
		})
		.extend({ orderBy: queryGeneric.shape.orderBy }),
});

export const getCategorySchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createCategorySchema = z.object({
	body: baseCategoryGeneric,
});

export const updateCategorySchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: categoryGeneric,
});

export const deleteCategorySchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
