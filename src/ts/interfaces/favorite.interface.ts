import type { Document, Model, PaginateModel } from 'mongoose';

// TS
import { IProduct, IUser, TDocument } from '@ts';

export interface IFavorite extends TDocument {
	user: TDocument['_id'];
	products: TDocument['_id'][];
}

export interface IFavoritePopulated extends Omit<IFavorite, 'user' | 'products'> {
	user: IUser;
	products: IProduct[];
}

export interface IFavoriteDocument extends IFavorite, Document<string> {}
export interface IFavoriteModel extends Model<IFavoriteDocument> {}
export interface IFavoriteMethods extends IFavoriteDocument {}
export interface IFavoritePaginateModel
	extends PaginateModel<IFavoritePopulated, {}, IFavoriteMethods> {}
