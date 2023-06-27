import { PipelineStage, Types } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Schemas
import { ProductModel, ProductVariantModel } from '@models';

// TS
import {
	IProduct,
	IProductPopulated,
	IProductVariant,
	TProductCreate,
	TProductQuery,
	TProductUpdate,
} from '@ts';

export const ProductRepository = {
	async getProducts(query: TProductQuery) {
		const conditions: PipelineStage[] = [];

		const activeQuery: Record<string, boolean> = {
			brand: !!query.brand,
			category: !!query.category,
			subCategory: !!query.subCategory,
			variants: !!(query.startPrice || query.endPrice || query.hasEmptyStock),
		};

		const populateDictionary: Record<string, PipelineStage[]> = {
			brand: [
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
			],
			category: [
				{
					$lookup: {
						from: 'categories',
						localField: 'category',
						foreignField: '_id',
						as: 'category',
					},
				},
				{
					$unwind: {
						path: '$category',
						preserveNullAndEmptyArrays: true,
					},
				},
				{ $unset: ['category.subCategories'] },
			],
			subCategory: [
				{
					$lookup: {
						from: 'subcategories',
						localField: 'subCategory',
						foreignField: '_id',
						as: 'subCategory',
					},
				},
				{
					$unwind: {
						path: '$subCategory',
						preserveNullAndEmptyArrays: true,
					},
				},
			],
			variants: [
				{
					$lookup: {
						from: 'productvariants',
						localField: 'variants',
						foreignField: '_id',
						as: 'variants',
					},
				},
			],
		};

		const sortByDictionary = {
			term: { name: query.orderBy },
			price: { 'variants.price': query.orderBy },
			stock: { 'variants.stock': query.orderBy },
			status: { 'variants.status': query.orderBy },
			createdAt: { createdAt: query.orderBy },
			updatedAt: { updatedAt: query.orderBy },
		} as const;

		if (query.term) conditions.unshift({ $match: { $text: { $search: query.term } } });

		if (query.brand)
			conditions.push(...populateDictionary.brand, {
				$match: { 'brand.name': query.brand },
			});

		if (query.category)
			conditions.push(...populateDictionary.category, {
				$match: { 'category.name': query.category },
			});

		if (query.subCategory)
			conditions.push(...populateDictionary.subCategory, {
				$match: { 'subCategory.name': query.subCategory },
			});

		if (query.startPrice || query.endPrice || query.hasEmptyStock)
			conditions.push(...populateDictionary.variants);

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

		if (query.startDate || query.endDate)
			conditions.push({
				$match: {
					createdAt: {
						...(query.startDate && { $gte: new Date(query.startDate) }),
						...(query.endDate && { $lte: new Date(query.endDate) }),
					},
				},
			});

		const keysToPopulate = Object.keys(populateDictionary).filter(
			key => !activeQuery[key]
		);

		const populateDictionaryFiltered = Object.fromEntries(
			Object.entries(populateDictionary).filter(([key]) => keysToPopulate.includes(key))
		);

		const populateStages = Object.values(populateDictionaryFiltered).flat();

		conditions.push(...populateStages);

		console.log(conditions);

		const aggregation = ProductModel.aggregate<IProductPopulated>(conditions);

		return await ProductModel.aggregatePaginate(aggregation, {
			...paginateConfig,
			page: query.page,
			limit: query.limit,
			sort: sortByDictionary[query.sortBy],
		});
	},

	async getProduct(id: IProduct['_id']) {
		return await ProductModel.findById(id)
			.populate('brand category subCategory variants')
			.lean<IProductPopulated>();
	},

	async createProduct(product: TProductCreate) {
		let variants: IProduct['variants'] = [];

		if (product?.variants?.length) {
			const createdVariants = await ProductVariantModel.create(product.variants);

			variants = createdVariants.map(variant => variant._id);
		}

		const createdProduct = await ProductModel.create({ ...product, variants }).then(doc =>
			doc.populate('brand category subCategory variants')
		);

		return createdProduct.toObject<IProductPopulated>();
	},

	async updateProduct(id: IProduct['_id'], product: TProductUpdate) {
		let variants: IProduct['variants'] = [];

		if (product?.variants?.length) {
			const upsertedVariants = await ProductVariantModel.bulkWrite(
				product.variants.map(({ _id, ...variant }) => ({
					updateOne: {
						filter: { sku: variant.sku },
						update: { $set: variant },
						upsert: true,
					},
				}))
			);

			const upsertedVariantsIds: Types.ObjectId[] = Object.values(
				upsertedVariants.upsertedIds
			);

			if (upsertedVariantsIds.length)
				variants = upsertedVariantsIds.map(upsertedIds => upsertedIds.toString());
		}

		const data = { ...product, variants: variants.length ? variants : undefined };

		return await ProductModel.findByIdAndUpdate(id, data, {
			new: true,
		})
			.populate('brand category subCategory variants')
			.lean<IProductPopulated>();
	},

	async deleteProduct(id: IProduct['_id']) {
		return await ProductModel.findByIdAndDelete(id).lean<IProduct>();
	},

	async deleteProductVariant(id: IProduct['_id'], variantId: IProductVariant['_id']) {
		return await Promise.all([
			ProductModel.findByIdAndUpdate(
				id,
				{ $pull: { variants: variantId } },
				{ new: true }
			).lean<IProduct>(),
			ProductVariantModel.findByIdAndDelete(variantId).lean<IProductVariant>(),
		]);
	},
};
