import { z } from 'zod';

export const loginAuthSchema = z.object({
	body: z.object({
		email: z.string().email(),
		password: z.string().min(6).max(20),
	}),
});
