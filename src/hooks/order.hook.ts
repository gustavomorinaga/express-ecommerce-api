import type { CallbackWithoutResultAndOptionalError } from 'mongoose';

// Models
import { ProductModel } from '@models';

// Functions
import { getOrderTotalPrice } from '@functions';

// TS
import { IOrderDocument, IOrderPopulated } from '@ts';

export const preSaveOrderHook = async function (
	this: IOrderDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	const order = await this.populate<IOrderPopulated>('products.product');

	if (!order.isNew) return next();

	order.totalPrice = getOrderTotalPrice(order);

	await Promise.all(
		order.products.map(({ product, quantity }) =>
			ProductModel.findByIdAndUpdate(product._id, {
				$inc: { stock: -quantity },
			})
		)
	);

	return next();
};
