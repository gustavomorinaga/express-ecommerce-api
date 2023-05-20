import { z } from 'zod';

// Schemas
import { addressSchema, objectIdGeneric } from '@schemas';

// Generics
export const orderSchema = z.object({
	user: objectIdGeneric,
	deliveryAddress: addressSchema,
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
		user: orderSchema.shape.user,
		deliveryAddress: orderSchema.shape.deliveryAddress,
		observation: orderSchema.shape.observation,
	}),
});

export const updateOrderSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		deliveryAddress: addressSchema.optional(),
		observation: orderSchema.shape.observation,
	}),
});

export const setStatusOrderSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		status: orderSchema.shape.status,
	}),
});
