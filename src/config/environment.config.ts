import dotenv from 'dotenv';
import type { TEnvironment } from '@ts';

dotenv.config();

export const environment: Partial<TEnvironment> = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: Number(process.env.PORT) || 3000,
	APP_URL: process.env.APP_URL,
	DATABASE_URL: process.env.DATABASE_URL,
	JWT_SECRET: process.env.JWT_SECRET,

	EMAIL_HOST: process.env.EMAIL_HOST,
	EMAIL_PORT: Number(process.env.EMAIL_PORT),
	EMAIL_USER: process.env.EMAIL_USER,
	EMAIL_PASS: process.env.EMAIL_PASS,
	EMAIL_FROM: process.env.EMAIL_FROM,

	AVATAR_GENERATOR_URL: process.env.AVATAR_GENERATOR_URL,
};
