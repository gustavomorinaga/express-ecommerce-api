import { z } from 'zod';

// Schemas
import { objectIdGeneric } from '@schemas';

// Generics
export const cartGeneric = z.object({
	user: objectIdGeneric,
	products: z.array(
		z.object({
			product: objectIdGeneric,
			quantity: z.number().min(1),
		})
	),
});

// Schemas
export const getCartSchema = z.object({
	params: z.object({
		userId: objectIdGeneric,
	}),
});

export const createCartSchema = z.object({
	body: cartGeneric,
});

export const updateCartSchema = z.object({
	params: z.object({
		userId: objectIdGeneric,
	}),
	body: z.object({
		products: cartGeneric.shape.products,
	}),
});

export const deleteCartSchema = z.object({
	params: z.object({
		userId: objectIdGeneric,
	}),
});
