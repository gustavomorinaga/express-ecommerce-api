import { z } from 'zod';

// Schemas
import {
	addressGeneric,
	dateGeneric,
	objectIdGeneric,
	queryEnums,
	queryGeneric,
} from '@schemas';

// Generics
export const userGeneric = z.object({
	name: z.string().min(3).max(50),
	email: z.string().email(),
	password: z.string().min(6).max(20),
	dateOfBirth: dateGeneric.optional(),
	billingAddress: addressGeneric.optional(),
	deliveryAddress: addressGeneric.optional(),
	active: z.boolean().default(true),
	role: z.enum(['user', 'admin']).default('user'),
});

// Schemas
export const getUsersSchema = z.object({
	query: z
		.object({
			term: z.coerce.string().optional(),
			showInactive: z.coerce.boolean().optional(),
		})
		.extend({
			...queryGeneric.shape,
			sortBy: z.enum(['term', ...queryEnums.sortBy]).default('term'),
		}),
});

export const getUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createUserSchema = z.object({
	body: userGeneric.pick({ name: true, email: true, password: true }),
});

export const updateUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: userGeneric.omit({ password: true, active: true, role: true }).partial(),
});

export const updateUserPasswordSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: userGeneric.pick({ password: true }),
});

export const updateUserActiveSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const deleteUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
