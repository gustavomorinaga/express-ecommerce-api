import { IProduct, IUser, TDocument } from '@ts';

export interface IFavorite extends TDocument {
	user: TDocument['_id'];
	products: TDocument['_id'][];
}

export interface IFavoritePopulated extends Omit<IFavorite, 'user' | 'products'> {
	user: IUser;
	products: IProduct[];
}
