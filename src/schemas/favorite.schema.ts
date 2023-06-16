import { z } from 'zod';

// Schemas
import { objectIdGeneric } from '@schemas';

// Generics
export const favoriteGeneric = z.object({
	user: objectIdGeneric,
	products: z.array(objectIdGeneric),
});

// Schemas
export const getFavoriteSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
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
