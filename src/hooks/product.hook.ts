import type { CallbackWithoutResultAndOptionalError, Query } from 'mongoose';

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

// export const preUpdateProductHook = function (
// 	this: Query<IProductDocument, IProductDocument>,
// 	next: CallbackWithoutResultAndOptionalError
// ) {
// 	const query = this.getUpdate() as Partial<IProductDocument>;

// 	const mutatedQuery = {
// 		...query,
// 		...(query?.variants?.length && {
// 			variants: query.variants.map(variant => ({
// 				...variant,
// 				status: getProductStatus(variant.stock),
// 			})),
// 		}),
// 	};

// 	this.setUpdate(mutatedQuery);

// 	return next();
// };
