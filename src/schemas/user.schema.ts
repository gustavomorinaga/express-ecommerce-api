import { z } from 'zod';

// Schemas
import { addressSchema, objectId } from '@schemas';

export const getUserSchema = z.object({
	params: z.object({
		id: objectId,
	}),
});

export const createUserSchema = z.object({
	body: z.object({
		name: z.string().min(3).max(50),
		email: z.string().email(),
		password: z.string().min(6).max(20),
	}),
});

export const updateUserSchema = z.object({
	params: z.object({
		id: objectId,
	}),
	body: z.object({
		name: z.string().min(3).max(50).optional(),
		email: z.string().email().optional(),
		billingAddress: addressSchema.optional(),
		deliveryAddress: addressSchema.optional(),
	}),
});

export const updateUserPasswordSchema = z.object({
	params: z.object({
		id: objectId,
	}),
	body: z.object({
		password: z.string().min(6).max(20),
	}),
});

export const deleteUserSchema = z.object({
	params: z.object({
		id: objectId,
	}),
});
