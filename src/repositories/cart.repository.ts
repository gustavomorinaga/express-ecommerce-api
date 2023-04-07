// Schemas
import { CartModel } from '@models';

// TS
import { ICart } from '@ts';

export const CartRepository = {
	async getCart(userId: string) {
		try {
			const cart = await CartModel.findOne({ user: userId })
				.populate('user')
				.populate({ path: 'products.product', select: '-stock' })
				.lean();

			return cart;
		} catch (error) {
			console.error(error);
		}
	},

	async createCart(cart: ICart) {
		try {
			const response = (await CartModel.create(cart)).toObject();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async updateCart(userId: string, cart: ICart) {
		try {
			const response = await CartModel.findOneAndUpdate({ user: userId }, cart, {
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
