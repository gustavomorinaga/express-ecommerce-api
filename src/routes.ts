import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

// Config
import { swaggerSpec } from '@config';

// Controllers
import {
	CartController,
	OrderController,
	ProductController,
	UserController,
} from './controllers';

// Middlewares
import { errorLogger } from '@middlewares';

const routes = Router();

// Routes
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
routes.use('/carts', CartController);
routes.use('/orders', OrderController);
routes.use('/products', ProductController);
routes.use('/users', UserController);

routes.use(errorLogger);

export default routes;
