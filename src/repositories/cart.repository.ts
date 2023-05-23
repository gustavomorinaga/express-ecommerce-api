// Schemas
import { CartModel } from '@models';

// Errors
import { handlerError } from '@errors';

// TS
import { ICart, IProduct } from '@ts';

export const CartRepository = {
	async getCart(userId: ICart['user']) {
		const cart = await CartModel.findOne({ user: userId })
			.populate('user')
			.populate({ path: 'products.product', select: '-stock' })
			.lean();
		if (!cart) return handlerError('Cart not found', 'NOT_FOUND');

		return cart as Omit<ICart, 'products'> & {
			products: { product: IProduct; quantity: number }[];
		};
	},

	async createCart(cart: ICart) {
		return (await CartModel.create(cart)).toObject();
	},

	async updateCart(userId: ICart['user'], cart: Omit<ICart, 'user'>) {
		const existsCart = await CartModel.findOne({ user: userId });
		if (!existsCart) return handlerError('Cart not found', 'NOT_FOUND');

		const isValidCart = await existsCart.checkCart(cart);
		if (!isValidCart) return handlerError('Cart has incorrect products', 'BAD_REQUEST');

		return await CartModel.findOneAndUpdate({ user: userId }, cart, {
			new: true,
		}).lean();
	},

	async clearCart(userId: ICart['user']) {
		const existsCart = await CartModel.findOne({ user: userId });
		if (!existsCart) return handlerError('Cart not found', 'NOT_FOUND');

		return (await CartModel.findOneAndUpdate(
			{ user: userId },
			{ products: [] },
			{ new: true }
		).lean()) as Omit<ICart, 'products'> & {
			products: { product: IProduct; quantity: number }[];
		};
	},

	async deleteCart(userId: ICart['user']) {
		return await CartModel.findOneAndDelete({ user: userId }).lean();
	},
};
