import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

// Config
import { connect, environment, logger } from './config';

// Routes
import routes from './routes';

// Middlewares
import { errorLogger } from '@middlewares';

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(pino(logger));
app.use(cors());

// Routes
app.use('/api', routes);

// Error handler
app.use(errorLogger);

(async () => {
	await connect();

	app.listen(environment.PORT, () => {
		console.log(`🌐 Server hosted on http://localhost:${environment.PORT}`);
	});
})();
