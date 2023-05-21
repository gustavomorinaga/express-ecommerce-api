import pino from 'pino-http';

// Config
import { environment } from '@config';

export const logger = pino({
	transport: {
		targets: [
			{
				target: 'pino-pretty',
				level: 'info',
				options: {
					colorize: true,
					singleLine: true,
				},
			},
			{
				target: 'pino-mongodb',
				level: 'error',
				options: {
					uri: `mongodb+srv://${environment.DATABASE_HOST}`,
					database: environment.DATABASE_NAME,
					collection: 'logs',
					mongoOptions: {
						auth: {
							username: environment.DATABASE_USER,
							password: environment.DATABASE_PASS,
						},
					},
				},
			},
		],
	},
});
