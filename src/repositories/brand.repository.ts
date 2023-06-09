import { PipelineStage } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Models
import { BrandModel } from '@models';

// TS
import { IBrand, TBrandQuery } from '@ts';

export const BrandRepository = {
	async getBrands(query: TBrandQuery) {
		const conditions: PipelineStage[] = [];

		if (query.name) conditions.unshift({ $match: { $text: { $search: query.name } } });

		conditions.push(
			{
				$sort: {
					...(query.sortBy === 'name' && { name: query.orderBy }),
					...(query.sortBy === 'createdAt' && { createdAt: query.orderBy }),
					...(query.sortBy === 'updatedAt' && { updatedAt: query.orderBy }),
				},
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

	async createBrand(brand: IBrand) {
		return (await BrandModel.create(brand)).toObject();
	},

	async updateBrand(id: IBrand['_id'], brand: IBrand) {
		return await BrandModel.findByIdAndUpdate(id, brand, { new: true }).lean();
	},

	async deleteBrand(id: IBrand['_id']) {
		return await BrandModel.findByIdAndDelete(id).lean();
	},
};
