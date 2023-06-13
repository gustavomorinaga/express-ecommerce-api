import { FilterQuery } from 'mongoose';

// Models
import { CategoryModel } from '@models';

// TS
import {
	ICategory,
	ICategoryDocument,
	TCategoryCreate,
	TCategoryQuery,
	TCategoryUpdate,
} from '@ts';

export const CategoryRepository = {
	async getCategories(query: TCategoryQuery) {
		const conditions: FilterQuery<ICategoryDocument> = {
			...(query.name && { $text: { $search: query.name } }),
		};

		return await CategoryModel.find(conditions)
			.sort({ [query.sortBy]: query.orderBy })
			.lean();
	},

	async getCategory(id: ICategory['_id']) {
		return await CategoryModel.findById(id).lean();
	},

	async createCategory(category: TCategoryCreate) {
		return (await CategoryModel.create(category)).toObject();
	},

	async updateCategory(id: ICategory['_id'], category: TCategoryUpdate) {
		return await CategoryModel.findByIdAndUpdate(id, category, { new: true }).lean();
	},

	async deleteCategory(id: ICategory['_id']) {
		return await CategoryModel.findByIdAndDelete(id).lean();
	},
};
