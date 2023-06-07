import { z } from 'zod';

// Schemas
import { objectIdGeneric } from '@schemas';

// Generics
export const brandGeneric = z.object({
	name: z.string(),
	description: z.string().optional(),
});

// Schemas
export const getBrandsSchema = z.object({
	query: z.object({
		name: z.string().optional(),
		sortBy: z.enum(['name', 'createdAt', 'updatedAt']).default('name'),
		orderBy: z
			.enum(['asc', 'desc'])
			.default('asc')
			.transform(value => (value === 'asc' ? 1 : -1)),
	}),
});

export const getBrandSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createBrandSchema = z.object({
	body: brandGeneric,
});

export const updateBrandSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: brandGeneric,
});

export const deleteBrandSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
