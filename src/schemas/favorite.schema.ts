import { z } from 'zod';

// Schemas
import { objectIdGeneric, queryEnums, queryGeneric } from '@schemas';

// Generics
export const favoriteProductGeneric = z.object({
	product: objectIdGeneric,
	variant: objectIdGeneric,
});

export const favoriteGeneric = z.object({
	user: objectIdGeneric.optional(),
	products: z.array(favoriteProductGeneric),
});

// Schemas
export const getFavoritesSchema = z.object({
	query: z
		.object({
			userID: objectIdGeneric.optional(),
		})
		.extend({
			...queryGeneric.shape,
			sortBy: z.enum(['price', ...queryEnums.sortBy]).default('createdAt'),
		}),
});

export const createFavoriteSchema = z.object({
	body: favoriteGeneric,
});

export const updateFavoriteSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
	}),
	body: z.object({
		products: favoriteGeneric.shape.products,
	}),
});

export const clearFavoriteSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
	}),
});

export const deleteFavoriteSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
	}),
});
