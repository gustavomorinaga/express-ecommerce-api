import { Router } from 'express';

// Repositories
import { CartRepository, OrderRepository } from '@repositories';

// Middlewares
import { validate } from '@middlewares';

// TS
import { IOrder } from '@ts';

// Schemas
import {
	createOrderSchema,
	getOrderSchema,
	updateOrderSchema,
	setStatusOrderSchema,
} from '@schemas';

/** Responsável por gerenciar os pedidos feitos pelos usuários */
const OrderController = Router();

OrderController.get('/', async (req, res) => {
	try {
		const orders = await OrderRepository.getOrders();

		return res.send(orders);
	} catch (error) {
		console.error(error);
	}
});

OrderController.get('/:id', validate(getOrderSchema), async (req, res) => {
	try {
		const { id } = req.params;

		const order = await OrderRepository.getOrder(id);

		return res.send(order);
	} catch (error) {
		console.error(error);
	}
});

OrderController.post('/', validate(createOrderSchema), async (req, res) => {
	try {
		const data: IOrder = req.body;

		const cart = await CartRepository.getCart(data.user as string);
		if (!cart) return res.status(400).send({ error: 'Cart not found' });

		await CartRepository.deleteCart(data.user as string);

		const totalPrice = cart.products.reduce((acc, { product, quantity }) => {
			return acc + product.price * quantity;
		}, 0);

		const response = await OrderRepository.createOrder({
			...data,
			totalPrice,
			products: cart.products,
		});

		return res.send(response);
	} catch (error) {
		console.error(error);
	}
});

OrderController.put('/:id', validate(updateOrderSchema), async (req, res) => {
	try {
		const { id } = req.params;
		const data: IOrder = req.body;

		const order = await OrderRepository.getOrder(id);
		if (!order) return res.status(400).send({ error: 'Order not found' });
		if (order.status === 'delivered')
			return res.status(400).send({ error: 'Order delivered' });

		const response = await OrderRepository.updateOrder(id, data);

		return res.send(response);
	} catch (error) {
		console.error(error);
	}
});

OrderController.patch('/:id/status', validate(setStatusOrderSchema), async (req, res) => {
	try {
		const { id } = req.params;
		const { status }: IOrder = req.body;

		const order = await OrderRepository.getOrder(id);
		if (order?.status === 'canceled')
			return res.status(400).send({ error: 'Order canceled' });
		if (order?.status === 'delivered')
			return res.status(400).send({ error: 'Order delivered' });

		await OrderRepository.setStatusOrder(id, status);

		return res.send();
	} catch (error) {
		console.error(error);
	}
});

export { OrderController };
