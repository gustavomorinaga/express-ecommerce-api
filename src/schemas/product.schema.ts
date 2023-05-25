import { z } from 'zod';

// Schemas
import { objectIdGeneric } from '@schemas';

// Generics
export const productGeneric = z.object({
	slug: z.string().min(10).max(100).optional(),
	name: z.string().min(10).max(100),
	description: z.string().min(20),
	price: z.number().min(0),
	stock: z.number().min(0),
	status: z.enum(['low-stock', 'out-of-stock', 'in-stock']).optional(),
	active: z.boolean().optional(),
});

// Schemas
export const getProductsSchema = z.object({
	query: z.object({
		name: z.string().optional(),
		startPrice: z
			.string()
			.optional()
			.transform(value => (value ? Number(value) : undefined)),
		endPrice: z
			.string()
			.optional()
			.transform(value => (value ? Number(value) : undefined)),
		hasEmptyStock: z
			.string()
			.optional()
			.transform(value => value === 'true'),
	}),
});

export const getProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createProductSchema = z.object({
	body: productGeneric,
});

export const updateProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		name: productGeneric.shape.name.optional(),
		description: productGeneric.shape.description.optional(),
		price: productGeneric.shape.price.optional(),
		stock: productGeneric.shape.stock.optional(),
	}),
});

export const deleteProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
