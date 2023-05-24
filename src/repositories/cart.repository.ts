// Config
import { paginateConfig } from '@config';

// Schemas
import { CartModel } from '@models';

// Errors
import { handleError } from '@errors';

// TS
import { ICart, ICartPopulated, IProduct } from '@ts';

export const CartRepository = {
	async getCarts() {
		return await CartModel.paginate(
			{},
			{ ...paginateConfig, populate: 'user products.product' }
		);
	},

	async getCart(userId: ICart['user']) {
		const cart = await CartModel.findOne({ user: userId })
			.populate('user')
			.populate({ path: 'products.product', select: '-stock' })
			.lean<ICartPopulated>();
		if (!cart) return handleError('Cart not found', 'NOT_FOUND');

		return cart;
	},

	async createCart(cart: ICart) {
		return (await CartModel.create(cart)).toObject();
	},

	async updateCart(userId: ICart['user'], cart: Omit<ICart, 'user'>) {
		const existsCart = await CartModel.findOne({ user: userId });
		if (!existsCart) return handleError('Cart not found', 'NOT_FOUND');

		return await CartModel.findOneAndUpdate({ user: userId }, cart, {
			new: true,
		}).lean();
	},

	async clearCart(userId: ICart['user']) {
		const existsCart = await CartModel.findOne({ user: userId });
		if (!existsCart) return handleError('Cart not found', 'NOT_FOUND');

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
