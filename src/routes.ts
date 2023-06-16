import { Router } from 'express';

// Swagger
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger-output.json';

// Controllers
import {
	AddressController,
	AuthController,
	BrandController,
	CartController,
	CategoryController,
	FavoriteController,
	OrderController,
	ProductController,
	UserController,
} from '@controllers';

// Middlewares
import { authMiddleware, isAdminMiddleware } from '@middlewares';

const routes = Router();

// Routes
routes.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes.use('/address', AddressController);
routes.use('/auth', AuthController);
routes.use('/brands', BrandController);
routes.use('/carts', authMiddleware, CartController);
routes.use('/categories', CategoryController);
routes.use('/favorites', authMiddleware, FavoriteController);
routes.use('/orders', authMiddleware, OrderController);
routes.use('/products', ProductController);
routes.use('/users', authMiddleware, UserController);

export default routes;
