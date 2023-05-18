import pino from 'pino-http';

export const logger = pino({
	level: 'info',
	browser: {
		asObject: true,
		serialize: true,
	},
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
			singleLine: true,
		},
	},
});
