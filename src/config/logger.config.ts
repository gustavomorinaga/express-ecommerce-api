import pino from 'pino-http';

export const logger = pino({
	level: 'info',
});
