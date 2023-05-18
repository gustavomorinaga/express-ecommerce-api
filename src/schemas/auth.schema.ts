import { z } from 'zod';

export const loginAuthSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string().min(6).max(20),
	}),
});

export const retrieveAuthSchema = z.object({
	body: z.object({
		email: z.string().email(),
	}),
});

export const resetAuthSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string().min(6).max(20),
	}),
});
