// Config
import { paginateConfig } from '@config';

// Models
import { BrandModel } from '@models';

// TS
import { IBrand } from '@ts';

export const BrandRepository = {
	async getBrands(query: any) {
		const conditions = [];

		if (query.name)
			conditions.push({
				$match: {
					name: { $regex: query.name, $options: 'i' },
				},
			});
		if (query.sortBy)
			conditions.push({
				$sort: {
					...(query.sortBy === 'name' && { name: query.orderBy }),
					...(query.sortBy === 'createdAt' && { createdAt: query.orderBy }),
					...(query.sortBy === 'updatedAt' && { updatedAt: query.orderBy }),
				},
			});

		conditions.push({
			$group: {
				_id: '$_id',
				name: { $first: '$name' },
				description: { $first: '$description' },
				active: { $first: '$active' },
			},
		});

		const aggregation = BrandModel.aggregate(conditions);

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
