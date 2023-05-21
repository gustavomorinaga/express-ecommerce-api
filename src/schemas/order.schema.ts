import { z } from 'zod';

// Schemas
import { addressGeneric, objectIdGeneric } from '@schemas';

// Generics
export const orderGeneric = z.object({
	user: objectIdGeneric,
	deliveryAddress: addressGeneric,
	observation: z.string().max(100).optional(),
	status: z.enum(['pending', 'canceled', 'delivered']),
});

// Schemas
export const getOrderSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createOrderSchema = z.object({
	body: z.object({
		user: orderGeneric.shape.user,
		deliveryAddress: orderGeneric.shape.deliveryAddress,
		observation: orderGeneric.shape.observation,
	}),
});

export const updateOrderSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		deliveryAddress: addressGeneric.optional(),
		observation: orderGeneric.shape.observation,
	}),
});

export const setStatusOrderSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		status: orderGeneric.shape.status,
	}),
});
