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
