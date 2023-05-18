import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { CartRepository } from '@repositories';

// Schemas
import {
	createCartSchema,
	deleteCartSchema,
	getCartSchema,
	updateCartSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar o carrinho de compras dos usuários */
const CartController = Router();

CartController.get('/:userId', async (req, res) => {
	try {
		const {
			params: { userId },
		} = await zParse(getCartSchema, req);

		const cart = await CartRepository.getCart(userId);

		return res.status(statuses.OK).send(cart);
	} catch (error) {
		console.error(error);
	}
});

CartController.post('/', async (req, res) => {
	try {
		const { body: data } = await zParse(createCartSchema, req);

		const response = await CartRepository.createCart(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		console.error(error);
	}
});

CartController.put('/:userId', async (req, res) => {
	try {
		const {
			params: { userId },
			body: data,
		} = await zParse(updateCartSchema, req);

		const response = await CartRepository.updateCart(userId, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		console.error(error);
	}
});

CartController.delete('/:userId', async (req, res) => {
	try {
		const {
			params: { userId },
		} = await zParse(deleteCartSchema, req);

		await CartRepository.deleteCart(userId);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		console.error(error);
	}
});

export { CartController };
