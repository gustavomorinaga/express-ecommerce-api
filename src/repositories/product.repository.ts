import { PipelineStage } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Schemas
import { ProductModel, ProductVariantModel } from '@models';

// Functions
import { getProductStatus } from '@functions';

// TS
import { IProduct, IProductPopulated, TProductQuery } from '@ts';

export const ProductRepository = {
	async getProducts(query: TProductQuery) {
		const conditions: PipelineStage[] = [
			{
				$lookup: {
					from: 'brands',
					localField: 'brand',
					foreignField: '_id',
					as: 'brand',
				},
			},
			{
				$unwind: '$brand',
			},
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

		if (query.term) conditions.unshift({ $match: { $text: { $search: query.term } } });
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

		const sortByDictionary = {
			term: { name: query.orderBy },
			price: { 'variants.price': query.orderBy },
			stock: { 'variants.stock': query.orderBy },
			status: { 'variants.status': query.orderBy },
			createdAt: { createdAt: query.orderBy },
			updatedAt: { updatedAt: query.orderBy },
		} as const;

		conditions.push({
			$group: {
				_id: '$_id',
				name: { $first: '$name' },
				description: { $first: '$description' },
				brand: { $first: '$brand' },
				active: { $first: '$active' },
				variants: { $push: '$variants' },
			},
		});

		const aggregation = ProductModel.aggregate<IProductPopulated>(conditions);

		return await ProductModel.aggregatePaginate(aggregation, {
			...paginateConfig,
			page: query.page,
			limit: query.limit,
			sort: sortByDictionary[query.sortBy],
			collation: { locale: 'en' },
		});
	},

	async getProduct(id: IProduct['_id']) {
		return await ProductModel.findById(id)
			.populate('brand variants')
			.lean<IProductPopulated>();
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
			doc.populate('brand variants')
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
			.populate('brand variants')
			.lean<IProductPopulated>();
	},

	async deleteProduct(id: IProduct['_id']) {
		return await ProductModel.findByIdAndDelete(id).lean();
	},
};
