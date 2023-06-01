import dotenv from 'dotenv';

// TS
import type { TEnvironment } from '@ts';

dotenv.config();

export const environment: TEnvironment = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: Number(process.env.PORT) || 3000,

	JWT_SECRET: process.env.JWT_SECRET || '',
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || '',

	BCRYPT_SALT: Number(process.env.BCRYPT_SALT) || 10,

	DATABASE_USER: process.env.DATABASE_USER || '',
	DATABASE_PASS: process.env.DATABASE_PASS || '',
	DATABASE_HOST: process.env.DATABASE_HOST || '',
	DATABASE_NAME: process.env.DATABASE_NAME || '',

	EMAIL_SERVICE: process.env.EMAIL_SERVICE || 'gmail',
	EMAIL_HOST: process.env.EMAIL_HOST || '',
	EMAIL_PORT: Number(process.env.EMAIL_PORT) || 465,
	EMAIL_USER: process.env.EMAIL_USER || '',
	EMAIL_PASS: process.env.EMAIL_PASS || '',
	EMAIL_FROM: process.env.EMAIL_FROM || '',

	AVATAR_GENERATOR_URL: process.env.AVATAR_GENERATOR_URL || '',
};
