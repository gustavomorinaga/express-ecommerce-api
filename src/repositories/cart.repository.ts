// Schemas
import { CartModel } from '@models';

// TS
import { ICart } from '@ts';

export const CartRepository = {
	async getCart(userId: string) {
		try {
			const product = await CartModel.findOne({ user: userId })
				.populate('user')
				.populate({ path: 'products.product', select: '-stock' })
				.lean();

			return product;
		} catch (error) {
			console.error(error);
		}
	},

	async createCart(product: ICart) {
		try {
			const response = (await CartModel.create(product)).toObject();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async updateCart(userId: string, product: ICart) {
		try {
			const response = await CartModel.findOneAndUpdate({ user: userId }, product, {
				new: true,
			}).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async deleteCart(userId: string) {
		try {
			const response = await CartModel.findOneAndDelete({ user: userId }).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},
};
