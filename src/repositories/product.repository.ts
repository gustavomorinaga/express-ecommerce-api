import { PipelineStage } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Schemas
import { ProductModel, ProductVariantModel } from '@models';

// Functions
import { getProductStatus } from '@functions';

// TS
import { IProduct, IProductPopulated, TQueryProduct } from '@ts';

export const ProductRepository = {
	async getProducts(query: TQueryProduct) {
		const conditions: PipelineStage[] = [
			{
				$lookup: {
					from: 'productvariants',
					localField: 'variants',
					foreignField: '_id',
					as: 'variants',
				},
			},
			{
				$unwind: '$variants',
			},
		];

		if (query.name)
			conditions.push({
				$match: {
					name: { $regex: query.name, $options: 'i' },
				},
			});
		if (query.startPrice || query.endPrice)
			conditions.push({
				$match: {
					'variants.price': {
						...(query.startPrice && { $gte: query.startPrice }),
						...(query.endPrice && { $lte: query.endPrice }),
					},
				},
			});
		if (query.hasEmptyStock)
			conditions.push({
				$match: {
					'variants.stock': { $lte: 0 },
				},
			});
		if (query.sortBy)
			conditions.push({
				$sort: {
					...(query.sortBy === 'name' && { name: query.orderBy }),
					...(query.sortBy === 'price' && { 'variants.price': query.orderBy }),
					...(query.sortBy === 'stock' && { 'variants.stock': query.orderBy }),
					...(query.sortBy === 'status' && { 'variants.status': query.orderBy }),
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
				variants: { $push: '$variants' },
			},
		});

		const aggregation = ProductModel.aggregate<IProductPopulated>(conditions);

		return await ProductModel.aggregatePaginate(aggregation, paginateConfig);
	},

	async getProduct(id: IProduct['_id']) {
		return await ProductModel.findById(id).populate('variants').lean<IProductPopulated>();
	},

	async createProduct(
		product: Omit<IProductPopulated, 'slug' | 'brand'> &
			Partial<Pick<IProductPopulated, 'slug'>> & { brand: IProduct['brand'] }
	) {
		let variants: IProduct['variants'] = [];

		if (product.variants?.length) {
			product.variants = product.variants.map(variant => ({
				...variant,
				status: getProductStatus(variant.stock),
			}));

			const createdVariants = await ProductVariantModel.insertMany(product.variants);

			variants = createdVariants.map(variant => variant._id);
		}

		const createdProduct = await ProductModel.create({ ...product, variants }).then(doc =>
			doc.populate('variants')
		);

		return createdProduct.toObject<IProductPopulated>();
	},

	async updateProduct(
		id: IProduct['_id'],
		product: DeepPartial<Omit<IProductPopulated, 'brand'>> & { brand?: IProduct['brand'] }
	) {
		return await ProductModel.findByIdAndUpdate(id, product, {
			new: true,
		})
			.populate('variants')
			.lean<IProductPopulated>();
	},

	async deleteProduct(id: IProduct['_id']) {
		return await ProductModel.findByIdAndDelete(id).lean();
	},
};
