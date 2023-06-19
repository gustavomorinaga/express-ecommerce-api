import { PipelineStage, Types } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Schemas
import { FavoriteModel } from '@models';

// Errors
import { handleError } from '@errors';

// TS
import {
	IFavorite,
	IFavoritePopulated,
	TFavoriteCreate,
	TFavoriteQuery,
	TFavoriteUpdate,
} from '@ts';

export const FavoriteRepository = {
	async getFavorites(query: TFavoriteQuery) {
		const conditions: PipelineStage[] = [];

		const populateDictionary: Record<string, PipelineStage[]> = {
			products: [
				{
					$unwind: '$products',
				},
				{
					$lookup: {
						from: 'products',
						localField: 'products.product',
						foreignField: '_id',
						as: 'products.product',
					},
				},
				{
					$unwind: '$products.product',
				},
			],
			variants: [
				{
					$lookup: {
						from: 'productvariants',
						localField: 'products.variant',
						foreignField: '_id',
						as: 'products.variant',
					},
				},
				{
					$unwind: '$products.variant',
				},
			],
			brand: [
				{
					$lookup: {
						from: 'brands',
						localField: 'products.product.brand',
						foreignField: '_id',
						as: 'products.product.brand',
					},
				},
				{
					$unwind: '$products.product.brand',
				},
			],
		};

		const sortByDictionary = {
			price: { 'variant.price': query.orderBy },
			createdAt: { createdAt: query.orderBy },
			updatedAt: { updatedAt: query.orderBy },
		} as const;

		if (query.userID)
			conditions.unshift({ $match: { user: new Types.ObjectId(query.userID) } });

		const populateStages = Object.values(populateDictionary).flat();

		conditions.push(
			...populateStages,
			{
				$replaceRoot: {
					newRoot: '$products',
				},
			},
			{
				$unset: ['product.variants', 'product.category', 'product.subCategory'],
			}
		);

		const aggregation = FavoriteModel.aggregate<IFavoritePopulated>(conditions);

		return await FavoriteModel.aggregatePaginate(aggregation, {
			...paginateConfig,
			page: query.page,
			limit: query.limit,
			sort: sortByDictionary[query.sortBy],
		});
	},

	async createFavorites(favorites: TFavoriteCreate) {
		const createdFavorite = await FavoriteModel.create(favorites)
			.then(doc => doc.populate('user'))
			.then(doc =>
				doc.populate({
					path: 'products',
					select: '-variants -category -subCategory',
					populate: { path: 'brand' },
				})
			);

		return createdFavorite.toObject<IFavoritePopulated>();
	},

	async updateFavorites(userID: IFavorite['user'], favorites: TFavoriteUpdate) {
		const existsFavorite = await FavoriteModel.findOne({ user: userID });
		if (!existsFavorite) return handleError('Favorites not found', 'NOT_FOUND');

		return await FavoriteModel.findOneAndUpdate({ user: userID }, favorites, {
			new: true,
		})
			.populate('user')
			.populate({
				path: 'products',
				select: '-variants -category -subCategory',
				populate: { path: 'brand' },
			})
			.lean<IFavoritePopulated>();
	},

	async clearFavorites(userID: IFavorite['user']) {
		const existsFavorite = await FavoriteModel.findOne({ user: userID });
		if (!existsFavorite) return handleError('Favorites not found', 'NOT_FOUND');

		return await FavoriteModel.findOneAndUpdate(
			{ user: userID },
			{ products: [] },
			{ new: true }
		)
			.populate('user')
			.lean<IFavoritePopulated>();
	},

	async deleteFavorites(userID: IFavorite['user']) {
		return await FavoriteModel.findOneAndDelete({ user: userID }).lean<IFavorite>();
	},
};
