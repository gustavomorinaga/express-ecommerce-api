import {
	CallbackWithoutResultAndOptionalError,
	Query,
	Types,
	UpdateQuery,
} from 'mongoose';

// Models
import { CategoryModel } from '@models';

// Errors
import { handleError } from '@errors';

// TS
import { ICategoryDocument } from '@ts';

export const preUpdateCategoryHook = async function (
	this: Query<ICategoryDocument, {}>,
	next: CallbackWithoutResultAndOptionalError
) {
	const category = await CategoryModel.findOne(this.getQuery()).lean();
	if (!category) return handleError('Category not found', 'NOT_FOUND');

	const data = this.getUpdate() as ICategoryDocument & UpdateQuery<ICategoryDocument>;

	if (!data?.subCategories?.length) return next();

	category.subCategories ??= [];

	const subCategories = [
		...category.subCategories,
		...data.subCategories.map(id => new Types.ObjectId(id)),
	];

	this.setUpdate({ ...data, subCategories });

	return next();
};
