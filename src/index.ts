import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import compression from 'compression';

// Config
import { connect, environment, logger } from './config';

// Routes
import routes from './routes';

// Middlewares
import { errorLogger, rateLimiter } from '@middlewares';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
		console.log(`🚀 Server hosted on http://localhost:${environment.PORT}`);
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
})();
