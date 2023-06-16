import { z } from 'zod';

// Schemas
import { objectIdGeneric, queryEnums, queryGeneric } from '@schemas';

// Generics
export const cartProductGeneric = z.object({
	product: objectIdGeneric,
	variant: objectIdGeneric,
	quantity: z.number().int().positive().min(1),
});

export const cartGeneric = z.object({
	user: objectIdGeneric,
	products: z.array(cartProductGeneric),
});

// Schemas
export const getCartsSchema = z.object({
	query: z.object({ term: z.coerce.string().optional() }).extend({
		...queryGeneric.shape,
		sortBy: z.enum(['term', ...queryEnums.sortBy]).default('term'),
	}),
});

export const getCartSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
	}),
});

export const createCartSchema = z.object({
	body: cartGeneric,
});

export const updateCartSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
	}),
	body: z.object({
		products: cartGeneric.shape.products,
	}),
});

export const clearCartSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
	}),
});

export const deleteCartSchema = z.object({
	params: z.object({
		userID: objectIdGeneric,
	}),
});
