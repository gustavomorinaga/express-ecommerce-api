import { z } from 'zod';

// Schemas
import { addressSchema, objectId } from '@schemas';

export const getOrderSchema = z.object({
	params: z.object({
		id: objectId,
	}),
});

export const createOrderSchema = z.object({
	body: z.object({
		user: objectId,
		deliveryAddress: addressSchema.optional(),
		observation: z.string().max(100).optional(),
	}),
});

export const updateOrderSchema = z.object({
	params: z.object({
		id: objectId,
	}),
	body: z.object({
		deliveryAddress: addressSchema.optional(),
		observation: z.string().max(100).optional(),
	}),
});

export const setStatusOrderSchema = z.object({
	params: z.object({
		id: objectId,
	}),
	body: z.object({
		status: z.enum(['pending', 'canceled', 'delivered']),
	}),
});
