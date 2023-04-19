import { z } from 'zod';

export const addressSchema = z.object({
	params: z.object({
		cep: z.string().min(8).max(8),
	}),
});
