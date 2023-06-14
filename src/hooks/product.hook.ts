import {
	CallbackWithoutResultAndOptionalError,
	Query,
	Types,
	UpdateQuery,
} from 'mongoose';

// Models
import { BrandModel, CategoryModel, ProductModel, SubCategoryModel } from '@models';

// Functions
import { getProductSlug } from '@functions';

// Errors
import { handleError } from '@errors';

// TS
import { IProductDocument } from '@ts';

export const preSaveProductHook = async function (
	this: IProductDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	const product = this;

	product.slug = getProductSlug(product.name);

	const [productExists, brandExists, categoryExists, subCategoryExists] =
		await Promise.all([
			ProductModel.exists({ slug: product.slug }),
			BrandModel.exists({ _id: product.brand }),
			CategoryModel.exists({ _id: product.category }),
			SubCategoryModel.exists({ _id: product.subCategory }),
		]);

	if (productExists) return handleError('Product already exists', 'BAD_REQUEST');
	if (!brandExists) return handleError('Brand not found', 'NOT_FOUND');
	if (!categoryExists) return handleError('Category not found', 'NOT_FOUND');
	if (!subCategoryExists) return handleError('SubCategory not found', 'NOT_FOUND');

	return next();
};

export const preUpdateProductHook = async function (
	this: Query<IProductDocument, {}>,
	next: CallbackWithoutResultAndOptionalError
) {
	const product = await ProductModel.findOne(this.getQuery()).lean();
	if (!product) return handleError('Product not found', 'NOT_FOUND');

	const data = this.getUpdate() as IProductDocument & UpdateQuery<IProductDocument>;

	if (data.brand) {
		const brandExists = await BrandModel.exists({ _id: data.brand });
		if (!brandExists) return handleError('Brand not found', 'NOT_FOUND');
	}

	if (data.category) {
		const categoryExists = await CategoryModel.exists({ _id: data.category });
		if (!categoryExists) return handleError('Category not found', 'NOT_FOUND');
	}

	if (data.subCategory) {
		const subCategoryExists = await SubCategoryModel.exists({ _id: data.subCategory });
		if (!subCategoryExists) return handleError('SubCategory not found', 'NOT_FOUND');
	}

	if (!data?.variants?.length) return next();

	product.variants ??= [];

	const variants = [
		...product.variants,
		...data.variants.map(id => new Types.ObjectId(id)),
	];

	this.setUpdate({ ...data, variants });

	return next();
};
