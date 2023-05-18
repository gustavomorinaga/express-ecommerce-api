import { z } from 'zod';
import { ObjectId } from '@utils';

export const getOrderSchema = z.object({
	params: z.object({
		id: ObjectId,
	}),
});

export const createOrderSchema = z.object({
	body: z.object({
		user: ObjectId,
		deliveryAddress: z.object({
			street: z.string().min(3).max(50),
			number: z.number().min(1),
			complement: z.string().optional(),
			neighborhood: z.string().min(3).max(50),
			city: z.string().min(3).max(50),
			state: z.string().min(2).max(2),
			country: z.string().min(3).max(50),
			zipCode: z.string().min(3).max(50),
		}),
		observation: z.string().max(100).optional(),
	}),
});

export const updateOrderSchema = z.object({
	body: z.object({
		deliveryAddress: z
			.object({
				street: z.string().min(3).max(50),
				number: z.number().min(1),
				complement: z.string().optional(),
				neighborhood: z.string().min(3).max(50),
				city: z.string().min(3).max(50),
				state: z.string().min(2).max(2),
				country: z.string().min(3).max(50),
				zipCode: z.string().min(3).max(50),
			})
			.optional(),
		observation: z.string().max(100).optional(),
	}),
	params: z.object({
		id: ObjectId,
	}),
});

export const setStatusOrderSchema = z.object({
	body: z.object({
		status: z.enum(['pending', 'canceled', 'delivered']),
	}),
	params: z.object({
		id: ObjectId,
	}),
});
