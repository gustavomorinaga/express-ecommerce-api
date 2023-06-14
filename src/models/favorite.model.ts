import { model, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// TS
import {
	IFavorite,
	IFavoriteDocument,
	IFavoriteMethods,
	IFavoriteModel,
	IFavoritePaginateModel,
} from '@ts';

const FavoriteSchema = new Schema<IFavorite, IFavoriteModel, IFavoriteMethods>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		products: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Product',
			},
		],
	},
	{ timestamps: true, collation: { locale: 'en' } }
);

FavoriteSchema.plugin(paginatePlugin);

export const FavoriteModel = model<IFavoriteDocument, IFavoritePaginateModel>(
	'Favorite',
	FavoriteSchema
);
