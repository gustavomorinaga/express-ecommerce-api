// Schemas
import { CartModel } from '@models';

// Errors
import { handleError } from '@errors';

// TS
import { ICart, ICartPopulated, TCartCreate, TCartQuery, TCartUpdate } from '@ts';

export const CartRepository = {
	async getCarts(query: TCartQuery) {
		return await CartModel.paginate(
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
						populate: {
							path: 'brand category subCategory',
						},
					},
				],
			}
		);
	},

	async getCart(userId: ICart['user']) {
		const cart = await CartModel.findOne({ user: userId })
			.populate('user products.variant')
			.populate({
				path: 'products.product',
				select: '-variants',
				populate: { path: 'brand category subCategory' },
			})
			.lean<ICartPopulated>();
		if (!cart) return handleError('Cart not found', 'NOT_FOUND');

		return cart;
	},

	async createCart(cart: TCartCreate) {
		const createdCart = await CartModel.create(cart)
			.then(doc => doc.populate('user products.variant'))
			.then(doc =>
				doc.populate({
					path: 'products.product',
					select: '-variants',
					populate: { path: 'brand category subCategory' },
				})
			);

		return createdCart.toObject<ICartPopulated>();
	},

	async updateCart(userId: ICart['user'], cart: TCartUpdate) {
		const existsCart = await CartModel.findOne({ user: userId });
		if (!existsCart) return handleError('Cart not found', 'NOT_FOUND');

		return await CartModel.findOneAndUpdate({ user: userId }, cart, {
			new: true,
		})
			.populate('user products.variant')
			.populate({
				path: 'products.product',
				select: '-variants',
				populate: { path: 'brand category subCategory' },
			})
			.lean<ICartPopulated>();
	},

	async clearCart(userId: ICart['user']) {
		const existsCart = await CartModel.findOne({ user: userId });
		if (!existsCart) return handleError('Cart not found', 'NOT_FOUND');

		return await CartModel.findOneAndUpdate(
			{ user: userId },
			{ products: [] },
			{ new: true }
		)
			.populate('user')
			.lean<ICartPopulated>();
	},

	async deleteCart(userId: ICart['user']) {
		return await CartModel.findOneAndDelete({ user: userId }).lean<ICart>();
	},
};
