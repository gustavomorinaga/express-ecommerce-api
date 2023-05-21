import mongoose from 'mongoose';

import { environment } from './environment.config';

export const connect = async () => {
	try {
		if (!environment.DATABASE_USER) throw new Error('DATABASE_USER not found');
		if (!environment.DATABASE_PASS) throw new Error('DATABASE_PASS not found');
		if (!environment.DATABASE_HOST) throw new Error('DATABASE_HOST not found');
		if (!environment.DATABASE_NAME) throw new Error('DATABASE_NAME not found');

		const uri = `mongodb+srv://${environment.DATABASE_USER}:${environment.DATABASE_PASS}@${environment.DATABASE_HOST}/${environment.DATABASE_NAME}?retryWrites=true&w=majority`;

		await mongoose.connect(uri);
		console.log('✅ Database connected');
	} catch (error) {
		console.error(error);
	}
};
