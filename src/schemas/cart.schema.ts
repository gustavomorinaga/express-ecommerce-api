import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const getCartSchema = z.object({
	params: z.object({
		userId: z.custom(isValidObjectId),
	}),
});

export const createCartSchema = z.object({
	body: z.object({
		user: z.custom(isValidObjectId),
		products: z
			.array(
				z.object({
					product: z.custom(isValidObjectId),
					quantity: z.number().min(1),
				})
			)
			.min(1),
	}),
});

export const updateCartSchema = z.object({
	body: z.object({
		products: z
			.array(
				z.object({
					product: z.custom(isValidObjectId),
					quantity: z.number().min(1),
				})
			)
			.min(1),
	}),
	params: z.object({
		userId: z.custom(isValidObjectId),
	}),
});

export const deleteCartSchema = z.object({
	params: z.object({
		userId: z.custom(isValidObjectId),
	}),
});
