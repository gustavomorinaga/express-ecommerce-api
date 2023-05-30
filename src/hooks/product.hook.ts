import type { CallbackWithoutResultAndOptionalError } from 'mongoose';

// Models
import { ProductModel } from '@models';

// Functions
import { getProductSlug } from '@functions';

// TS
import { IProductDocument } from '@ts';

export const preSaveProductHook = async function (
	this: IProductDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	const product = this;

	product.slug = getProductSlug(product.name);

	const productExists = await ProductModel.exists({ slug: product.slug });
	if (productExists) return next(new Error('Product already exists'));

	return next();
};
