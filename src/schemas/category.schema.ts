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
			name: z.coerce.string().optional(),
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
	body: categoryGeneric.extend({
		subCategories: categoryGeneric.shape.subCategories.default([]),
	}),
});

export const updateCategorySchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: categoryGeneric.partial().augment({
		subCategories: z
			.array(baseCategoryGeneric.extend({ _id: objectIdGeneric }).partial())
			.optional(),
	}),
});

export const deleteCategorySchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const deleteSubCategorySchema = z.object({
	params: z.object({
		id: objectIdGeneric,
		idSubCategory: objectIdGeneric,
	}),
});
