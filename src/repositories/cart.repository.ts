// Schemas
import { CartModel, ProductModel } from '@models';

// TS
import { ICart, IProduct } from '@ts';

export const CartRepository = {
	async getCart(userId: string) {
		const cart = await CartModel.findOne({ user: userId })
			.populate('user')
			.populate({ path: 'products.product', select: '-stock' })
			.lean();

		return cart as Omit<typeof cart, 'products'> & {
			products: { product: IProduct; quantity: number }[];
		};
	},

	async createCart(cart: ICart) {
		const response = (await CartModel.create(cart)).toObject();

		return response;
	},

	async checkCart(products: ICart['products']) {
		const response = await ProductModel.find({
			_id: { $in: products.map(p => p.product) },
		}).lean();

		return response.length === products.length;
	},

	async updateCart(userId: string, cart: Omit<ICart, 'user'>) {
		const response = await CartModel.findOneAndUpdate({ user: userId }, cart, {
			new: true,
		}).lean();

		return response;
	},

	async deleteCart(userId: string) {
		const response = await CartModel.findOneAndDelete({ user: userId }).lean();

		return response;
	},
};
