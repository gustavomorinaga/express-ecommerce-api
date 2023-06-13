import {
	CallbackWithoutResultAndOptionalError,
	Query,
	Types,
	UpdateQuery,
} from 'mongoose';

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

export const preUpdateProductHook = async function (
	this: Query<IProductDocument, {}>,
	next: CallbackWithoutResultAndOptionalError
) {
	const data = this.getUpdate() as IProductDocument & UpdateQuery<IProductDocument>;

	if (!data?.variants?.length) return next();

	const product = await ProductModel.findOne(this.getQuery()).lean();
	if (!product) return next(new Error('Product not found'));

	product.variants ??= [];

	const variants = [
		...product.variants,
		...data.variants.map(id => new Types.ObjectId(id)),
	];

	this.setUpdate({ ...data, variants });

	return next();
};
