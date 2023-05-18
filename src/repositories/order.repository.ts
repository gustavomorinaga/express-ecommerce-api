// Schemas
import { OrderModel } from '@models';

// TS
import { IOrder } from '@ts';

export const OrderRepository = {
	async getOrders() {
		const products = await OrderModel.find()
			.populate('user')
			.populate({ path: 'products.product', select: '-stock' })
			.lean();

		return products;
	},

	async getOrder(id: string) {
		const product = await OrderModel.findById(id)
			.populate('user')
			.populate({ path: 'products.product', select: '-stock' })
			.lean();

		return product;
	},

	async createOrder(product: Omit<IOrder, 'status'>) {
		const response = (await OrderModel.create(product)).toObject();

		return response;
	},

	async updateOrder(id: string, product: Partial<IOrder>) {
		const response = await OrderModel.findByIdAndUpdate(id, product, {
			new: true,
		}).lean();

		return response;
	},

	async setStatusOrder(id: string, status: IOrder['status']) {
		const response = await OrderModel.findByIdAndUpdate(id, {
			status,
		}).lean();

		return response;
	},
};
