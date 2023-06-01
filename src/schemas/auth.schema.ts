import { z } from 'zod';

// Schemas
import { userGeneric } from '@schemas';

// Generics
export const authGeneric = z.object({
	email: userGeneric.shape.email,
	password: userGeneric.shape.password,
});

// Schemas
export const loginAuthSchema = z.object({
	body: authGeneric,
});

export const refreshAuthSchema = z.object({
	cookies: z.object({
		jwt: z.string(),
	}),
});

export const retrieveAuthSchema = z.object({
	body: z.object({
		email: authGeneric.shape.email,
	}),
});

export const resetAuthSchema = z.object({
	body: authGeneric,
});
