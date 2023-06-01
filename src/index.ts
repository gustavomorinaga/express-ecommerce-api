import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import compression from 'compression';
import pino from 'pino-http';

// Config
import { connect, environment, logger } from '@config';

// Routes
import routes from './routes';

// Middlewares
import { errorLogger, rateLimiter } from '@middlewares';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(compression());
app.use(pino(logger));
app.set('trust proxy', 1);

// Routes
app.use('/api', rateLimiter, routes);

// Error handler
app.use(errorLogger);

(async () => {
	const connection = await connect();
	if (!connection) return;

	app.listen(environment.PORT, () => {
		console.log(`🚀 Server ready at http://localhost:${environment.PORT}`);
	});

	app.on('error', error => {
		console.error(`❌ Server error: ${error}`);
	});

	process.on('unhandledRejection', error => {
		console.error(`❌ Unhandled rejection: ${error}`);
	});

	process.on('uncaughtException', error => {
		console.error(`❌ Uncaught exception: ${error}`);
	});

	process.on('exit', () => {
		console.log('👋 Bye bye!');
	});

	process.on('SIGINT', () => {
		console.log('👋 Bye bye!');
	});

	process.on('SIGTERM', () => {
		console.log('👋 Bye bye!');
	});
})();
