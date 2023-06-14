import type { CallbackWithoutResultAndOptionalError } from 'mongoose';

// Models
import { ProductModel, UserModel } from '@models';

// Errors
import { handleError } from '@errors';

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

	if (!user) return handleError('User not found', 'NOT_FOUND');
	if (!products.length) return handleError('Cart is empty', 'NOT_FOUND');
	if (products.length !== cart.products.length)
		return handleError('Products invalid or not found', 'BAD_REQUEST');

	return next();
};
