import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const getUserSchema = z.object({
	params: z.object({
		id: z.custom(isValidObjectId),
	}),
});

export const createUserSchema = z.object({
	body: z.object({
		name: z.string().min(3).max(50),
		email: z.string().email(),
		password: z.string().min(6).max(20),
		billingAddress: z
			.object({
				street: z.string().min(3).max(50),
				number: z.number().min(1),
				complement: z.string().optional(),
				neighborhood: z.string().min(3).max(50),
				city: z.string().min(3).max(50),
				state: z.string().min(2).max(2),
				country: z.string().min(3).max(50),
				zipCode: z.string().min(3).max(50),
			})
			.optional(),
		deliveryAddress: z
			.object({
				street: z.string().min(3).max(50),
				number: z.number().min(1),
				complement: z.string().optional(),
				neighborhood: z.string().min(3).max(50),
				city: z.string().min(3).max(50),
				state: z.string().min(2).max(2),
				country: z.string().min(3).max(50),
				zipCode: z.string().min(3).max(50),
			})
			.optional(),
	}),
});

export const updateUserSchema = z.object({
	body: z.object({
		name: z.string().min(3).max(50).optional(),
		email: z.string().email().optional(),
		billingAddress: z
			.object({
				street: z.string().min(3).max(50),
				number: z.number().min(1),
				complement: z.string().optional(),
				neighborhood: z.string().min(3).max(50),
				city: z.string().min(3).max(50),
				state: z.string().min(2).max(2),
				country: z.string().min(3).max(50),
				zipCode: z.string().min(3).max(50),
			})
			.optional(),
		deliveryAddress: z
			.object({
				street: z.string().min(3).max(50),
				number: z.number().min(1),
				complement: z.string().optional(),
				neighborhood: z.string().min(3).max(50),
				city: z.string().min(3).max(50),
				state: z.string().min(2).max(2),
				country: z.string().min(3).max(50),
				zipCode: z.string().min(3).max(50),
			})
			.optional(),
	}),
	params: z.object({
		id: z.custom(isValidObjectId),
	}),
});

export const updateUserPasswordSchema = z.object({
	body: z.object({
		password: z.string().min(6).max(20),
	}),
	params: z.object({
		id: z.custom(isValidObjectId),
	}),
});

export const deleteUserSchema = z.object({
	params: z.object({
		id: z.custom(isValidObjectId),
	}),
});
