import { z } from 'zod';

// Schemas
import { objectId } from '@schemas';

export const getProductsSchema = z.object({
	query: z.object({
		name: z.string().optional(),
		price: z.string().optional(),
		stock: z.string().optional(),
	}),
});

export const getProductSchema = z.object({
	params: z.object({
		id: objectId,
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
	params: z.object({
		id: objectId,
	}),
	body: z.object({
		name: z.string().min(3).max(50).optional(),
		description: z.string().min(20).optional(),
		price: z.number().min(0).optional(),
		stock: z.number().min(0).optional(),
	}),
});

export const deleteProductSchema = z.object({
	params: z.object({
		id: objectId,
	}),
});
