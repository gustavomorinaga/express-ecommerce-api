import mongoose from 'mongoose';

import { environment } from './environment';

export const connect = async () => {
	try {
		if (!environment.DATABASE_URL) throw new Error('DATABASE_URL not found');

		await mongoose.connect(environment.DATABASE_URL);
		console.log('Database connected');
	} catch (error) {
		console.error(error);
	}
};
