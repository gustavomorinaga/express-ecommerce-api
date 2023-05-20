import { z } from 'zod';

// Schemas
import { userEmailGeneric, userPasswordGeneric } from '@schemas';

// Generics
export const authSchema = z.object({
	email: userEmailGeneric,
	password: userPasswordGeneric,
});

// Schemas
export const loginAuthSchema = z.object({
	body: authSchema,
});

export const retrieveAuthSchema = z.object({
	body: z.object({
		email: authSchema.shape.email,
	}),
});

export const resetAuthSchema = z.object({
	body: authSchema,
});
