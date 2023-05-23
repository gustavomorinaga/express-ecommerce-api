import { TDocument } from '@ts';
import { IProduct } from './product.interface';
import type { ObjectId } from 'mongoose';

export interface ICart extends TDocument {
	user: ObjectId | string;
	products: {
		product: IProduct | string;
		quantity: number;
	}[];
}
