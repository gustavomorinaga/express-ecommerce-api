import type { CallbackWithoutResultAndOptionalError, Query } from 'mongoose';

// Functions
import { getProductSlug, getProductStatus } from '@functions';

// TS
import { IProductDocument } from '@ts';

export const preSaveProductHook = function (
	this: IProductDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	const product = this;

	product.status = getProductStatus(product);
	product.slug = getProductSlug(product);

	return next();
};

export const preUpdateProductHook = function (
	this: Query<IProductDocument, IProductDocument>,
	next: CallbackWithoutResultAndOptionalError
) {
	const query = this.getUpdate() as Partial<IProductDocument>;

	const mutatedQuery = {
		...query,
		...(query?.stock !== undefined && {
			status: getProductStatus(query as IProductDocument),
		}),
	};

	this.setUpdate(mutatedQuery);

	return next();
};
