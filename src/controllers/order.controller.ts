import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { CartRepository, OrderRepository } from '@repositories';

// Schemas
import {
	createOrderSchema,
	getOrderSchema,
	updateOrderSchema,
	setStatusOrderSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar os pedidos feitos pelos usuários */
const OrderController = Router();

OrderController.get('/', async (req, res, next) => {
	try {
		const orders = await OrderRepository.getOrders();

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

		const order = await OrderRepository.getOrder(id);

		return res.status(statuses.OK).send(order);
	} catch (error) {
		next(error);
	}
});

OrderController.post('/', async (req, res, next) => {
	try {
		const { body: data } = await zParse(createOrderSchema, req);

		const cart = await CartRepository.getCart(data.user);
		if (!cart) return res.status(statuses.NOT_FOUND).send({ error: 'Cart not found' });

		await CartRepository.deleteCart(data.user as string);

		const totalPrice = cart.products.reduce((acc, { product, quantity }) => {
			return acc + product.price * quantity;
		}, 0);

		const response = await OrderRepository.createOrder({
			...data,
			totalPrice,
			products: cart.products,
		});

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

		const order = await OrderRepository.getOrder(id);
		if (!order)
			return res.status(statuses.BAD_REQUEST).send({ error: 'Order not found' });
		if (order?.status === 'canceled')
			return res.status(statuses.BAD_REQUEST).send({ error: 'Order canceled' });
		if (order?.status === 'delivered')
			return res.status(statuses.BAD_REQUEST).send({ error: 'Order delivered' });

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

		const order = await OrderRepository.getOrder(id);
		if (order?.status === 'canceled')
			return res.status(statuses.BAD_REQUEST).send({ error: 'Order canceled' });
		if (order?.status === 'delivered')
			return res.status(statuses.BAD_REQUEST).send({ error: 'Order delivered' });

		const response = await OrderRepository.setStatusOrder(id, status);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

export { OrderController };
