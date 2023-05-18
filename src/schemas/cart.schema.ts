import { z } from 'zod';
import { ObjectId } from '@utils';

export const getCartSchema = z.object({
	params: z.object({
		userId: ObjectId,
	}),
});

export const createCartSchema = z.object({
	body: z.object({
		user: ObjectId,
		products: z
			.array(
				z.object({
					product: ObjectId,
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
					product: ObjectId,
					quantity: z.number().min(1),
				})
			)
			.min(1),
	}),
	params: z.object({
		userId: ObjectId,
	}),
});

export const deleteCartSchema = z.object({
	params: z.object({
		userId: ObjectId,
	}),
});
