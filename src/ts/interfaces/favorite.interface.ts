import type { AggregatePaginateModel, Document, Model } from 'mongoose';

// TS
import { IProduct, IProductVariant, IUser, TDocument } from '@ts';

export interface IFavorite extends TDocument {
	user: TDocument['_id'];
	products: {
		product: TDocument['_id'];
		variant: TDocument['_id'];
	}[];
}

export interface IFavoritePopulated extends Omit<IFavorite, 'user' | 'products'> {
	user: IUser;
	products: {
		product: IProduct;
		variant: IProductVariant;
	}[];
}

export interface IFavoriteDocument extends IFavorite, Document<string> {}
export interface IFavoriteModel extends Model<IFavoriteDocument> {}
export interface IFavoriteMethods extends IFavoriteDocument {}
export interface IFavoritePaginateModel
	extends AggregatePaginateModel<IFavoriteDocument> {}
