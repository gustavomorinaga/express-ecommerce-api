import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { CartRepository } from '@repositories';

// Middlewares
import { isAdminMiddleware } from '@middlewares';

// Schemas
import {
	clearCartSchema,
	createCartSchema,
	deleteCartSchema,
	getCartSchema,
	getCartsSchema,
	updateCartSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

// Errors
import { handleError } from '@errors';

/** Responsável por gerenciar o carrinho de compras dos usuários */
const CartController = Router();

CartController.get('/', isAdminMiddleware, async (req, res, next) => {
	try {
		const { query } = await zParse(getCartsSchema, req);

		const carts = await CartRepository.getCarts(query);

		return res.status(statuses.OK).send(carts);
	} catch (error) {
		next(error);
	}
});

CartController.get('/:userID', async (req, res, next) => {
	try {
		const {
			params: { userID },
		} = await zParse(getCartSchema, req);
		const { _id: authUserID, role } = req._user;

		const cart = await CartRepository.getCart(userID);
		if (!cart) return handleError('Cart not found', 'NOT_FOUND');
		if (role === 'user' && cart.user._id?.toString() !== authUserID)
			return handleError('User unauthorized', 'UNAUTHORIZED');

		return res.status(statuses.OK).send(cart);
	} catch (error) {
		next(error);
	}
});

CartController.post('/', async (req, res, next) => {
	try {
		const { body: data } = await zParse(createCartSchema, req);

		const response = await CartRepository.createCart(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		next(error);
	}
});

CartController.put('/:userID', async (req, res, next) => {
	try {
		const {
			params: { userID },
			body: data,
		} = await zParse(updateCartSchema, req);

		const response = await CartRepository.updateCart(userID, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

CartController.patch('/:userID/clear', async (req, res, next) => {
	try {
		const {
			params: { userID },
		} = await zParse(clearCartSchema, req);

		const response = await CartRepository.clearCart(userID);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

CartController.delete('/:userID', isAdminMiddleware, async (req, res, next) => {
	try {
		const {
			params: { userID },
		} = await zParse(deleteCartSchema, req);

		await CartRepository.deleteCart(userID);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { CartController };
