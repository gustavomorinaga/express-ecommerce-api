import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { CartRepository, OrderRepository } from '@repositories';

// Schemas
import {
	createOrderSchema,
	getOrdersSchema,
	getOrderSchema,
	updateOrderSchema,
	setStatusOrderSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

// Errors
import { handleError } from '@errors';

/** Responsável por gerenciar os pedidos feitos pelos usuários */
const OrderController = Router();

OrderController.get('/', async (req, res, next) => {
	try {
		const { query } = await zParse(getOrdersSchema, req);
		const { _id: authUserID, role } = req._user;

		if (role === 'user') query.userID = authUserID;

		const orders = await OrderRepository.getOrders(query);

		return res.status(statuses.OK).send(orders);
	} catch (error) {
		next(error);
	}
});

OrderController.get('/:id', async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(getOrderSchema, req);
		const { _id: authUserID, role } = req._user;

		const order = await OrderRepository.getOrder(id);
		if (!order) return handleError('Order not found', 'NOT_FOUND');
		if (role === 'user' && order.user._id?.toString() !== authUserID)
			return handleError('User unauthorized', 'UNAUTHORIZED');

		return res.status(statuses.OK).send(order);
	} catch (error) {
		next(error);
	}
});

OrderController.post('/', async (req, res, next) => {
	try {
		const { body: data } = await zParse(createOrderSchema, req);

		const cart = await CartRepository.getCart(data.user);
		const products = cart.products.map(({ product, variant, quantity }) => ({
			product: product._id,
			variant: variant._id,
			quantity,
		}));

		if (!products.length) return handleError('Cart is empty', 'BAD_REQUEST');

		const [response] = await Promise.all([
			OrderRepository.createOrder({ ...data, products }),
			CartRepository.clearCart(data.user),
		]);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		next(error);
	}
});

OrderController.put('/:id', async (req, res, next) => {
	try {
		const {
			params: { id },
			body: data,
		} = await zParse(updateOrderSchema, req);

		const response = await OrderRepository.updateOrder(id, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

OrderController.patch('/:id/status', async (req, res, next) => {
	try {
		const {
			params: { id },
			body: { status },
		} = await zParse(setStatusOrderSchema, req);

		const response = await OrderRepository.setStatusOrder(id, status);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

export { OrderController };
