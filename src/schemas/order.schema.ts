import { z } from 'zod';

// Schemas
import { addressGeneric, objectIdGeneric, queryGeneric } from '@schemas';

// Generics
export const orderGeneric = z.object({
	orderID: z.string(),
	user: objectIdGeneric,
	deliveryAddress: addressGeneric,
	totalPrice: z.number().positive().min(0),
	status: z.enum(['pending', 'canceled', 'delivered']).default('pending'),
	observation: z.string().max(100).optional(),
	products: z.array(
		z.object({
			product: objectIdGeneric,
			variant: objectIdGeneric,
			quantity: z.number().int().positive().min(1),
		})
	),
});

// Schemas
export const getOrdersSchema = z.object({
	query: z
		.object({
			orderID: z.string().optional(),
			userID: objectIdGeneric.optional(),
			status: orderGeneric.shape.status.removeDefault().optional(),
		})
		.extend(queryGeneric.shape),
});

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
