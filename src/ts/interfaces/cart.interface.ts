import { Document, Model, PaginateModel } from 'mongoose';

// TS
import { TDocument, IProduct, IUser } from '@ts';

export interface ICart extends TDocument {
	user: TDocument['_id'];
	products: {
		product: TDocument['_id'];
		quantity: number;
	}[];
}

export interface ICartPopulated extends Omit<ICart, 'user' | 'products'> {
	user: IUser;
	products: {
		product: IProduct;
		quantity: number;
	}[];
}

export interface ICartDocument extends ICart, Document<string> {}
export interface ICartModel extends Model<ICartDocument> {}
export interface ICartMethods extends ICartDocument {
	checkCart: (cart: Omit<ICart, 'user'>) => Promise<boolean>;
}
export interface ICartPaginateModel
	extends PaginateModel<ICartDocument, {}, ICartMethods> {}
