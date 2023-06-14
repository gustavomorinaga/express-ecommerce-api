import { FilterQuery, Types } from 'mongoose';

// Models
import { CategoryModel, SubCategoryModel } from '@models';

// TS
import {
	ICategory,
	ICategoryDocument,
	ICategoryPopulated,
	ISubCategory,
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
			.lean<ICategory>();
	},

	async getCategory(id: ICategory['_id']) {
		return await CategoryModel.findById(id).lean<ICategory>();
	},

	async createCategory(category: TCategoryCreate) {
		let subCategories: ICategory['subCategories'] = [];

		if (category?.subCategories?.length) {
			const createdSubCategories = await SubCategoryModel.create(category.subCategories);

			subCategories = createdSubCategories.map(subCategory => subCategory._id);
		}

		const createdCategory = await CategoryModel.create({
			...category,
			subCategories,
		}).then(doc => doc.populate('subCategories'));

		return createdCategory.toObject<ICategoryPopulated>();
	},

	async updateCategory(id: ICategory['_id'], category: TCategoryUpdate) {
		let subCategories: ICategory['subCategories'] = [];

		if (category?.subCategories?.length) {
			const upsertedSubCategories = await SubCategoryModel.bulkWrite(
				category.subCategories.map(({ _id, ...subCategory }) => ({
					updateOne: {
						filter: { _id },
						update: { $set: subCategory },
						upsert: true,
					},
				}))
			);

			const upsertedSubCategoriesIds: Types.ObjectId[] = Object.values(
				upsertedSubCategories.upsertedIds
			);

			if (upsertedSubCategoriesIds.length)
				subCategories = upsertedSubCategoriesIds.map(upsertedIds =>
					upsertedIds.toString()
				);
		}

		const data = {
			...category,
			subCategories: subCategories.length ? subCategories : undefined,
		};

		return await CategoryModel.findByIdAndUpdate(id, data, { new: true })
			.populate('subCategories')
			.lean<ICategoryPopulated>();
	},

	async deleteCategory(id: ICategory['_id']) {
		return await CategoryModel.findByIdAndDelete(id).lean<ICategory>();
	},

	async deleteSubCategory(id: ICategory['_id'], subCategoryId: ISubCategory['_id']) {
		return await Promise.all([
			CategoryModel.findByIdAndUpdate(
				id,
				{ $pull: { subCategories: subCategoryId } },
				{ new: true }
			).lean<ICategory>(),
			SubCategoryModel.findByIdAndDelete(subCategoryId).lean<ISubCategory>(),
		]);
	},
};
