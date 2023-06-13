import { FilterQuery, PipelineStage } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Models
import { BrandModel } from '@models';

// TS
import { IBrand, IBrandDocument, TBrandCreate, TBrandQuery, TBrandUpdate } from '@ts';

export const BrandRepository = {
	async getBrands(query: TBrandQuery) {
		const conditions: FilterQuery<IBrandDocument> = {
			...(query.name && { $text: { $search: query.name } }),
		};

		return await BrandModel.find(conditions)
			.sort({ [query.sortBy]: query.orderBy })
			.lean<IBrand>();
	},

	async getBrand(id: IBrand['_id']) {
		return await BrandModel.findById(id).lean<IBrand>();
	},

	async createBrand(brand: TBrandCreate) {
		return (await BrandModel.create(brand)).toObject<IBrand>();
	},

	async updateBrand(id: IBrand['_id'], brand: TBrandUpdate) {
		return await BrandModel.findByIdAndUpdate(id, brand, { new: true }).lean<IBrand>();
	},

	async deleteBrand(id: IBrand['_id']) {
		return await BrandModel.findByIdAndDelete(id).lean<IBrand>();
	},
};
