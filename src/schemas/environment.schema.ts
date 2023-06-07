import { z } from 'zod';

export const envSchema = z.object({
	ENV: z.enum(['development', 'tests', 'production']).optional().default('development'),
	PORT: z
		.string()
		.optional()
		.default('3000')
		.transform(port => Number(port)),

	JWT_SECRET: z.string(),
	JWT_REFRESH_SECRET: z.string(),

	BCRYPT_SALT: z
		.string()
		.optional()
		.default('10')
		.transform(salt => Number(salt)),

	DATABASE_USER: z.string(),
	DATABASE_PASS: z.string(),
	DATABASE_HOST: z.string(),
	DATABASE_NAME: z.string(),

	EMAIL_SERVICE: z.string().optional().default('gmail'),
	EMAIL_HOST: z.string(),
	EMAIL_PORT: z
		.string()
		.optional()
		.default('465')
		.transform(port => Number(port)),
	EMAIL_USER: z.string(),
	EMAIL_PASS: z.string(),
	EMAIL_FROM: z.string(),

	AVATAR_GENERATOR_URL: z.string(),
});
