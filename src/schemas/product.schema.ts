import { z } from 'zod';

// Schemas
import { objectIdGeneric, queryEnums, queryGeneric } from '@schemas';

// Generics
export const productVariantGeneric = z.object({
	name: z.string().min(1).max(50),
	sku: z.string().min(5).max(50),
	price: z.number().nonnegative().min(0).default(0),
	stock: z.number().nonnegative().min(0).default(0),
	status: z.enum(['low-stock', 'out-of-stock', 'in-stock']).optional(),
	active: z.boolean().default(true).optional(),
});

export const productGeneric = z.object({
	slug: z.string().min(10).max(100).optional(),
	name: z.string().min(10).max(100),
	description: z.string().min(20),
	brand: objectIdGeneric,
	category: objectIdGeneric,
	variants: z.array(productVariantGeneric),
	active: z.boolean().default(true).optional(),
});

// Schemas
export const getProductsSchema = z.object({
	query: z
		.object({
			term: z.string().optional(),
			brand: z.string().optional(),
			category: z.string().optional(),
			startPrice: z.coerce.number().positive().optional(),
			endPrice: z.coerce.number().positive().optional(),
			hasEmptyStock: z.coerce.boolean().optional(),
		})
		.extend({
			...queryGeneric.shape,
			sortBy: z
				.enum(['term', 'price', 'stock', 'status', ...queryEnums.sortBy])
				.default('term'),
		}),
});

export const getProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createProductSchema = z.object({
	body: productGeneric.extend({ variants: productGeneric.shape.variants.default([]) }),
});

export const updateProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: productGeneric.partial().augment({
		variants: z
			.array(
				productVariantGeneric
					.omit({ status: true })
					.extend({ _id: objectIdGeneric })
					.partial()
			)
			.optional(),
	}),
});

export const deleteProductSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const deleteProductVariantSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
		idVariant: objectIdGeneric,
	}),
});
