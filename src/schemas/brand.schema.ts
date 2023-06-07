import { z } from 'zod';

// Schemas
import { objectIdGeneric, queryEnums, queryGeneric } from '@schemas';

// Generics
export const brandGeneric = z.object({
	name: z.string(),
	description: z.string().optional(),
});

// Schemas
export const getBrandsSchema = z.object({
	query: z
		.object({
			name: z.string().optional(),
		})
		.extend({
			...queryGeneric.shape,
			sortBy: z.enum(['name', ...queryEnums.sortBy]).default('name'),
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
