import { z } from 'zod';

// Schemas
import { objectIdGeneric } from '@schemas';

// Generics
export const productVariantGeneric = z.object({
	name: z.string().min(1).max(50),
	sku: z.string().min(5).max(50),
	price: z.number().min(0).default(0),
	stock: z.number().min(0).default(0),
	status: z.enum(['low-stock', 'out-of-stock', 'in-stock']).optional(),
	active: z.boolean().default(true).optional(),
});

export const productGeneric = z.object({
	slug: z.string().min(10).max(100).optional(),
	name: z.string().min(10).max(100),
	description: z.string().min(20),
	brand: objectIdGeneric,
	variants: z.array(productVariantGeneric).default([]),
	active: z.boolean().default(true).optional(),
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
			.transform(value => (value !== undefined ? value === 'true' : undefined)),
		sortBy: z
			.enum(['name', 'price', 'stock', 'status', 'createdAt', 'updatedAt'])
			.default('name'),
		orderBy: z
			.enum(['asc', 'desc'])
			.default('asc')
			.transform(value => (value === 'asc' ? 1 : -1)),
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
	body: productGeneric.partial().augment({
		variants: z.array(productVariantGeneric.omit({ status: true }).partial()).optional(),
	}),
});

export const deleteProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
