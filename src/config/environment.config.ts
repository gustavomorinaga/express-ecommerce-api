import dotenv from 'dotenv';
dotenv.config();

// Schemas
import { envSchema } from '@schemas';

/** Todas as variáveis de ambiente que a API utiliza para funcionar. */
export const environment = envSchema.parse(process.env);
