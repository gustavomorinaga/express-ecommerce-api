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
						select: '-variants -category -subCategory',
						populate: {
							path: 'brand',
						},
					},
				],
			}
		);
	},

	async getCart(userID: ICart['user']) {
		const cart = await CartModel.findOne({ user: userID })
			.populate('user products.variant')
			.populate({
				path: 'products.product',
				select: '-variants -category -subCategory',
				populate: { path: 'brand' },
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
					select: '-variants -category -subCategory',
					populate: { path: 'brand' },
				})
			);

		return createdCart.toObject<ICartPopulated>();
	},

	async updateCart(userID: ICart['user'], cart: TCartUpdate) {
		const existsCart = await CartModel.findOne({ user: userID });
		if (!existsCart) return handleError('Cart not found', 'NOT_FOUND');

		return await CartModel.findOneAndUpdate({ user: userID }, cart, {
			new: true,
		})
			.populate('user products.variant')
			.populate({
				path: 'products.product',
				select: '-variants -category -subCategory',
				populate: { path: 'brand' },
			})
			.lean<ICartPopulated>();
	},

	async clearCart(userID: ICart['user']) {
		const existsCart = await CartModel.findOne({ user: userID });
		if (!existsCart) return handleError('Cart not found', 'NOT_FOUND');

		return await CartModel.findOneAndUpdate(
			{ user: userID },
			{ products: [] },
			{ new: true }
		)
			.populate('user')
			.lean<ICartPopulated>();
	},

	async deleteCart(userID: ICart['user']) {
		return await CartModel.findOneAndDelete({ user: userID }).lean<ICart>();
	},
};
