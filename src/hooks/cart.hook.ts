import type { CallbackWithoutResultAndOptionalError } from 'mongoose';

// Models
import { ProductModel, UserModel } from '@models';

// TS
import { ICartDocument } from '@ts';

export const preSaveCartHook = async function (
	this: ICartDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	const cart = this;

	if (!cart.isNew) return next();

	const [user, products] = await Promise.all([
		UserModel.findById(cart.user).lean(),
		ProductModel.find({
			_id: { $in: cart.products.map(({ product: _id }) => _id) },
		}).lean(),
	]);

	if (!user) return next(new Error('Invalid user'));
	if (!products.length) return next(new Error('Cart is empty'));
	if (products.length !== cart.products.length)
		return next(new Error('Invalid products'));

	return next();
};
