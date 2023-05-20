import { z } from 'zod';

// Schemas
import { addressSchema, objectIdGeneric } from '@schemas';

// Generics
export const userNameGeneric = z.string().min(3).max(50);
export const userEmailGeneric = z.string().email();
export const userPasswordGeneric = z.string().min(6).max(20);

// Schemas
export const getUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});

export const createUserSchema = z.object({
	body: z.object({
		name: userNameGeneric,
		email: userEmailGeneric,
		password: userPasswordGeneric,
	}),
});

export const updateUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		name: userNameGeneric.optional(),
		email: userEmailGeneric.optional(),
		billingAddress: addressSchema.optional(),
		deliveryAddress: addressSchema.optional(),
	}),
});

export const updateUserPasswordSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
	body: z.object({
		password: userPasswordGeneric,
	}),
});

export const deleteUserSchema = z.object({
	params: z.object({
		id: objectIdGeneric,
	}),
});
