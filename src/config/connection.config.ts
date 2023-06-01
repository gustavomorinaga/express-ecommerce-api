import mongoose from 'mongoose';

// Config
import { environment } from '@config';

// Errors
import { handleError } from '@errors';

export const connect = async () => {
	try {
		const variables = [
			'DATABASE_USER',
			'DATABASE_PASS',
			'DATABASE_HOST',
			'DATABASE_NAME',
		] as const;

		for (const variable of variables)
			if (!environment[variable])
				return handleError(`${variable} not found`, 'INTERNAL_SERVER_ERROR');

		const uri = `mongodb+srv://${environment.DATABASE_USER}:${environment.DATABASE_PASS}@${environment.DATABASE_HOST}/${environment.DATABASE_NAME}?retryWrites=true&w=majority`;

		mongoose.connection.on('connecting', () => {
			console.log('🔌 Connecting to database...');
		});

		mongoose.connection.on('connected', () => {
			console.log('✅ Database connected');
		});

		mongoose.connection.on('disconnected', () => {
			console.log('❌ Database disconnected');
		});

		mongoose.connection.on('error', error => {
			console.error(error);
		});

		return await mongoose.connect(uri);
	} catch (error) {
		console.error(error);
	}
};
