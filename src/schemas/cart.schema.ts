import { z } from 'zod';

// Schemas
import { objectId } from '@schemas';

export const getCartSchema = z.object({
	params: z.object({
		userId: objectId,
	}),
});

export const createCartSchema = z.object({
	body: z.object({
		user: objectId,
		products: z
			.array(
				z.object({
					product: objectId,
					quantity: z.number().min(1),
				})
			)
			.min(1),
	}),
});

export const updateCartSchema = z.object({
	params: z.object({
		userId: objectId,
	}),
	body: z.object({
		products: z
			.array(
				z.object({
					product: objectId,
					quantity: z.number().min(1),
				})
			)
			.min(1),
	}),
});

export const deleteCartSchema = z.object({
	params: z.object({
		userId: objectId,
	}),
});
