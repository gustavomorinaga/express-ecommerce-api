import { z } from 'zod';

// Schemas
import { addressGeneric, objectIdGeneric } from '@schemas';

// Generics
export const userGeneric = z.object({
	name: z.string().min(3).max(50),
	email: z.string().email(),
	password: z.string().min(6).max(20),
	billingAddress: addressGeneric.optional(),
	deliveryAddress: addressGeneric.optional(),
});

// Schemas
export const getUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createUserSchema = z.object({
	body: z.object({
		name: userGeneric.shape.name,
		email: userGeneric.shape.email,
		password: userGeneric.shape.password,
	}),
});

export const updateUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		name: userGeneric.shape.name.optional(),
		email: userGeneric.shape.email.optional(),
		billingAddress: addressGeneric,
		deliveryAddress: addressGeneric,
	}),
});

export const updateUserPasswordSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		password: userGeneric.shape.password,
	}),
});

export const deleteUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
