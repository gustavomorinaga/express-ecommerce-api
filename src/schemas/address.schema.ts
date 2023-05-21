import { z } from 'zod';

// Generics
export const addressGeneric = z.object({
	street: z.string().min(3).max(50),
	number: z.number().min(1),
	complement: z.string().optional(),
	neighborhood: z.string().min(3).max(50),
	city: z.string().min(3).max(50),
	state: z.string().min(2).max(2),
	country: z.string().min(3).max(50),
	zipCode: z.string().min(9).max(9),
});

// Schemas
export const getAddressByZipCodeSchema = z.object({
	params: z.object({
		cep: z.string().min(8).max(8),
	}),
});
