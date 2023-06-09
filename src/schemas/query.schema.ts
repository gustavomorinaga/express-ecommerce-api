import { z } from 'zod';

// Enums
export const queryEnums = {
	sortBy: ['createdAt', 'updatedAt'],
	orderBy: ['asc', 'desc'],
} as const;

// Generics
export const queryGeneric = z.object({
	sortBy: z.enum(queryEnums.sortBy).default('createdAt'),
	orderBy: z
		.enum(queryEnums.orderBy)
		.default('asc')
		.transform(value => (value === 'asc' ? 1 : -1)),
	page: z.coerce.number().int().positive().min(1).default(1),
	limit: z.coerce.number().int().positive().min(1).max(100).default(10),
});
