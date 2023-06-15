import { z } from 'zod';

export const envSchema = z.object({
	ENV: z.enum(['development', 'tests', 'production']).default('development'),
	PORT: z.coerce.number().default(3000),

	JWT_SECRET: z.coerce.string(),
	JWT_REFRESH_SECRET: z.coerce.string(),

	BCRYPT_SALT: z.coerce.number().default(10),

	DATABASE_USER: z.coerce.string(),
	DATABASE_PASS: z.coerce.string(),
	DATABASE_HOST: z.coerce.string(),
	DATABASE_NAME: z.coerce.string(),

	EMAIL_SERVICE: z.coerce.string().default('gmail'),
	EMAIL_HOST: z.coerce.string(),
	EMAIL_PORT: z.coerce.number().default(465),
	EMAIL_USER: z.coerce.string(),
	EMAIL_PASS: z.coerce.string(),
	EMAIL_FROM: z.coerce.string(),

	AVATAR_GENERATOR_URL: z.coerce.string(),
});
