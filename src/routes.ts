import { Router } from 'express';

// Controllers
import {
	CartController,
	OrderController,
	ProductController,
	UserController,
} from './controllers';

const routes = Router();

// Routes
routes.use('/carts', CartController);
routes.use('/orders', OrderController);
routes.use('/products', ProductController);
routes.use('/users', UserController);

export default routes;
