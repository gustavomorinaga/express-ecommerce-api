import { TTimestamps } from '@ts';
import { IProduct } from './product.interface';
import type { ObjectId } from 'mongoose';

export interface ICart extends TTimestamps {
	user: ObjectId | string;
	products: [
		{
			product: IProduct;
			quantity: number;
		}
	];
}
