// Schemas
import { OrderModel } from '@models';

// Errors
import { handleError } from '@errors';

// TS
import { IOrder, IOrderPopulated } from '@ts';

export const OrderRepository = {
	async getOrders() {
		return await OrderModel.paginate(
			{},
			{
				populate: [
					{
						path: 'user',
					},
					{
						path: 'products.variant',
					},
					{
						path: 'products.product',
						select: '-variants',
					},
				],
			}
		);
	},

	async getOrder(id: string) {
		return await OrderModel.findById(id)
			.populate('user products.variant')
			.populate({ path: 'products.product', select: '-variants' })
			.lean<IOrderPopulated>();
	},

	async createOrder(order: Omit<IOrder, 'orderID' | 'status' | 'totalPrice'>) {
		const createdOrder = await OrderModel.create(order)
			.then(doc => doc.populate('user products.variant'))
			.then(doc =>
				doc.populate({
					path: 'products.product',
					select: '-variants',
				})
			);

		return createdOrder.toObject<IOrderPopulated>();
	},

	async updateOrder(
		id: string,
		product: Partial<Pick<IOrder, 'deliveryAddress' | 'observation'>>
	) {
		return await OrderModel.findByIdAndUpdate(id, product, { new: true })
			.populate('user products.variant')
			.populate({ path: 'products.product', select: '-variants' })
			.lean<IOrderPopulated>();
	},

	async setStatusOrder(id: string, status: IOrder['status']) {
		return await OrderModel.findByIdAndUpdate(id, { status }, { new: true })
			.populate('user products.variant')
			.populate({ path: 'products.product', select: '-variants' })
			.lean<IOrderPopulated>();
	},
};
