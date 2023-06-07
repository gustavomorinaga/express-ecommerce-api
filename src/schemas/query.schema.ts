import { z } from 'zod';

// Generics
export const queryGeneric = z.object({
	sortBy: z.enum(['createdAt', 'updatedAt']).default('createdAt'),
	orderBy: z
		.enum(['asc', 'desc'])
		.default('asc')
		.transform(value => (value === 'asc' ? 1 : -1)),
});

// Enums
export const queryEnums = {
	sortBy: Object.values(queryGeneric.shape.sortBy.removeDefault().enum),
};
