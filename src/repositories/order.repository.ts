// Schemas
import { OrderModel } from '@models';

// Errors
import { handlerError } from '@errors';

// TS
import { IOrder } from '@ts';

export const OrderRepository = {
	async getOrders() {
		return await OrderModel.find()
			.populate('user')
			.populate({ path: 'products.product', select: '-stock' })
			.lean();
	},

	async getOrder(id: string) {
		return await OrderModel.findById(id)
			.populate('user')
			.populate({ path: 'products.product', select: '-stock' })
			.lean();
	},

	async createOrder(order: Omit<IOrder, 'totalPrice' | 'status'>) {
		return (await OrderModel.create(order)).toObject();
	},

	async updateOrder(id: string, product: Partial<IOrder>) {
		const existsOrder = await OrderModel.findById(id).lean();
		if (!existsOrder) return handlerError('Order not found', 'NOT_FOUND');
		if (existsOrder.status === 'canceled')
			return handlerError('Order is canceled', 'BAD_REQUEST');
		if (existsOrder.status === 'delivered')
			return handlerError('Order is delivered', 'BAD_REQUEST');
		if (existsOrder.status === 'completed')
			return handlerError('Order is completed', 'BAD_REQUEST');

		return await OrderModel.findByIdAndUpdate(id, product, {
			new: true,
		}).lean();
	},

	async setStatusOrder(id: string, status: IOrder['status']) {
		const existsOrder = await OrderModel.findById(id).lean();
		if (!existsOrder) return handlerError('Order not found', 'NOT_FOUND');
		if (existsOrder.status === 'canceled')
			return handlerError('Order is canceled', 'BAD_REQUEST');
		if (existsOrder.status === 'delivered')
			return handlerError('Order is delivered', 'BAD_REQUEST');
		if (existsOrder.status === 'completed')
			return handlerError('Order is completed', 'BAD_REQUEST');

		return await OrderModel.findByIdAndUpdate(id, {
			status,
		}).lean();
	},
};
