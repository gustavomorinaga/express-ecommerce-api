import { PipelineStage } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Models
import { BrandModel } from '@models';

// TS
import { IBrand, TBrandCreate, TBrandQuery, TBrandUpdate } from '@ts';

export const BrandRepository = {
	async getBrands(query: TBrandQuery) {
		const conditions: PipelineStage[] = [];

		if (query.name) conditions.unshift({ $match: { $text: { $search: query.name } } });

		const sortByDictionary = {
			name: { name: query.orderBy },
			createdAt: { createdAt: query.orderBy },
			updatedAt: { updatedAt: query.orderBy },
		};

		conditions.push(
			{
				$sort: sortByDictionary[query.sortBy],
			},
			{
				$group: {
					_id: '$_id',
					name: { $first: '$name' },
					description: { $first: '$description' },
				},
			}
		);

		const aggregation = BrandModel.aggregate(conditions, { collation: { locale: 'en' } });

		return await BrandModel.aggregatePaginate(aggregation, paginateConfig);
	},

	async getBrand(id: IBrand['_id']) {
		return await BrandModel.findById(id).lean();
	},

	async createBrand(brand: TBrandCreate) {
		return (await BrandModel.create(brand)).toObject();
	},

	async updateBrand(id: IBrand['_id'], brand: TBrandUpdate) {
		return await BrandModel.findByIdAndUpdate(id, brand, { new: true }).lean();
	},

	async deleteBrand(id: IBrand['_id']) {
		return await BrandModel.findByIdAndDelete(id).lean();
	},
};
