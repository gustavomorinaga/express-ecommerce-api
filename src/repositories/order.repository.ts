// Schemas
import { OrderModel } from '@models';

// TS
import { IOrder } from '@ts';

export const OrderRepository = {
	async getOrders() {
		try {
			const products = await OrderModel.find()
				.populate('user')
				.populate({ path: 'products.product', select: '-stock' })
				.lean();

			return products;
		} catch (error) {
			console.error(error);
		}
	},

	async getOrder(id: string) {
		try {
			const product = await OrderModel.findById(id)
				.populate('user')
				.populate({ path: 'products.product', select: '-stock' })
				.lean();

			return product;
		} catch (error) {
			console.error(error);
		}
	},

	async createOrder(product: Omit<IOrder, 'status'>) {
		try {
			const response = (await OrderModel.create(product)).toObject();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async updateOrder(id: string, product: Partial<IOrder>) {
		try {
			const response = await OrderModel.findByIdAndUpdate(id, product, {
				new: true,
			}).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async setStatusOrder(id: string, status: IOrder['status']) {
		try {
			const response = await OrderModel.findByIdAndUpdate(id, {
				status,
			}).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},
};
