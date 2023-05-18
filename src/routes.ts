import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

// Config
import { swaggerSpec } from '@config';

// Controllers
import {
	AddressController,
	AuthController,
	CartController,
	OrderController,
	ProductController,
	UserController,
} from './controllers';

// Middlewares
import { authenticateToken } from '@middlewares';

const routes = Router();

// Routes
routes.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
routes.use('/address', AddressController);
routes.use('/auth', AuthController);
routes.use('/carts', authenticateToken, CartController);
routes.use('/orders', authenticateToken, OrderController);
routes.use('/products', ProductController);
routes.use('/users', authenticateToken, UserController);

export default routes;
