import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const getProductsSchema = z.object({
	query: z.object({
		name: z.string().optional(),
		price: z.string().optional(),
		stock: z.string().optional(),
	}),
});

export const getProductSchema = z.object({
	params: z.object({
		id: z.custom(isValidObjectId),
	}),
});

export const createProductSchema = z.object({
	body: z.object({
		name: z.string().min(10).max(100),
		description: z.string().min(20),
		price: z.number().min(0),
		stock: z.number().min(0),
	}),
});

export const updateProductSchema = z.object({
	body: z.object({
		name: z.string().min(3).max(50).optional(),
		description: z.string().min(20).optional(),
		price: z.number().min(0).optional(),
		stock: z.number().min(0).optional(),
	}),
	params: z.object({
		id: z.custom(isValidObjectId),
	}),
});

export const deleteProductSchema = z.object({
	params: z.object({
		id: z.custom(isValidObjectId),
	}),
});
