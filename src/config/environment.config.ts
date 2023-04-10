import dotenv from 'dotenv';
import type { TEnvironment } from '@ts';

dotenv.config();

export const environment: Partial<TEnvironment> = {
	ENV: process.env.NODE_ENV || 'development',
	PORT: Number(process.env.PORT) || 3000,
	DATABASE_URL: process.env.DATABASE_URL,
};
