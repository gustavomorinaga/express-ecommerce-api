import { model, Schema } from 'mongoose';

// Config
import { aggregatePaginatePlugin } from '@config';

// TS
import {
	IFavorite,
	IFavoriteDocument,
	IFavoriteMethods,
	IFavoriteModel,
	IFavoritePaginateModel,
} from '@ts';

const FavoriteProductSchema = new Schema(
	{
		product: {
			type: Schema.Types.ObjectId,
			ref: 'Product',
			required: true,
		},
		variant: {
			type: Schema.Types.ObjectId,
			ref: 'ProductVariant',
			required: true,
			unique: true,
		},
	},
	{ timestamps: true, collation: { locale: 'en' } }
);

const FavoriteSchema = new Schema<IFavorite, IFavoriteModel, IFavoriteMethods>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		products: [FavoriteProductSchema],
	},
	{ timestamps: true, collation: { locale: 'en' } }
);

FavoriteSchema.plugin(aggregatePaginatePlugin);

export const FavoriteModel = model<IFavoriteDocument, IFavoritePaginateModel>(
	'Favorite',
	FavoriteSchema
);
