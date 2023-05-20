import { z } from 'zod';

// Schemas
import { objectIdGeneric } from '@schemas';

// Generics
export const productSchema = z.object({
	name: z.string().min(10).max(100),
	description: z.string().min(20),
	price: z.number().min(0),
	stock: z.number().min(0),
});

// Schemas
export const getProductsSchema = z.object({
	query: z.object({
		name: z.string().optional(),
		price: z.string().optional(),
		stock: z.string().optional(),
	}),
});

export const getProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createProductSchema = z.object({
	body: productSchema,
});

export const updateProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		name: productSchema.shape.name.optional(),
		description: productSchema.shape.description.optional(),
		price: productSchema.shape.price.optional(),
		stock: productSchema.shape.stock.optional(),
	}),
});

export const deleteProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
