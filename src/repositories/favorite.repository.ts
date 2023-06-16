// Schemas
import { FavoriteModel } from '@models';

// Errors
import { handleError } from '@errors';

// TS
import { IFavorite, IFavoritePopulated, TFavoriteCreate, TFavoriteUpdate } from '@ts';

export const FavoriteRepository = {
	async getFavorites() {
		return await FavoriteModel.paginate(
			{},
			{
				populate: [
					{
						path: 'user',
					},
					{
						path: 'products',
						select: '-variants',
						populate: {
							path: 'brand category',
						},
					},
				],
			}
		);
	},

	async getUserFavorites(userID: IFavorite['user']) {
		const favorite = await FavoriteModel.findOne({ user: userID })
			.populate('user')
			.populate({
				path: 'products',
				select: '-variants',
				populate: { path: 'brand category' },
			})
			.lean<IFavoritePopulated>();
		if (!favorite) return handleError('Favorites not found', 'NOT_FOUND');

		return favorite;
	},

	async createUserFavorites(favorites: TFavoriteCreate) {
		const createdFavorite = await FavoriteModel.create(favorites)
			.then(doc => doc.populate('user'))
			.then(doc =>
				doc.populate({
					path: 'products',
					select: '-variants',
					populate: { path: 'brand category' },
				})
			);

		return createdFavorite.toObject<IFavoritePopulated>();
	},

	async updateUserFavorites(userID: IFavorite['user'], favorites: TFavoriteUpdate) {
		const existsFavorite = await FavoriteModel.findOne({ user: userID });
		if (!existsFavorite) return handleError('Favorites not found', 'NOT_FOUND');

		return await FavoriteModel.findOneAndUpdate({ user: userID }, favorites, {
			new: true,
		})
			.populate('user')
			.populate({
				path: 'products',
				select: '-variants',
				populate: { path: 'brand category' },
			})
			.lean<IFavoritePopulated>();
	},

	async clearUserFavorites(userID: IFavorite['user']) {
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

	async deleteUserFavorites(userID: IFavorite['user']) {
		return await FavoriteModel.findOneAndDelete({ user: userID }).lean<IFavorite>();
	},
};
