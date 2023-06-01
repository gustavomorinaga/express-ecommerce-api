import type { CallbackWithoutResultAndOptionalError, Query } from 'mongoose';

// Models
import { OrderModel, ProductVariantModel } from '@models';

// Functions
import { getOrderTotalPrice } from '@functions';

// Utils
import { generateNumberUUID } from '@utils';

// Errors
import { handleError } from '@errors';

// TS
import { EHttpStatus, IOrderDocument, IOrderPopulated } from '@ts';

const orderErrors: Record<string, { message: string; status: keyof typeof EHttpStatus }> =
	{
		canceled: {
			message: 'Order is canceled',
			status: 'BAD_REQUEST',
		},
		delivered: {
			message: 'Order is delivered',
			status: 'BAD_REQUEST',
		},
		completed: {
			message: 'Order is completed',
			status: 'BAD_REQUEST',
		},
		'not-found': {
			message: 'Order not found',
			status: 'NOT_FOUND',
		},
	} as const;

export const preSaveOrderHook = async function (
	this: IOrderDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	const order = await this.populate<IOrderPopulated>(
		'user products.product products.variant'
	);

	if (!order.isNew) return next();

	order.orderID = generateNumberUUID();
	order.totalPrice = getOrderTotalPrice(order);

	await Promise.all(
		order.products.map(({ variant, quantity }) =>
			ProductVariantModel.findByIdAndUpdate(variant._id, {
				$inc: { stock: -quantity },
			})
		)
	);

	return next();
};

export const preFindAndUpdateOrderHook = async function (
	this: Query<IOrderDocument, {}>,
	next: CallbackWithoutResultAndOptionalError
) {
	const order = await OrderModel.findOne(this.getQuery()).lean();

	if (!order || orderErrors[order?.status])
		return handleError(
			orderErrors[order?.status || 'not-found'].message,
			orderErrors[order?.status || 'not-found'].status
		);

	return next();
};
