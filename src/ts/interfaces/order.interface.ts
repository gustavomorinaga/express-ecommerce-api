import { IAddress, TDocument } from '@ts';
import { IProduct } from './product.interface';
import type { ObjectId } from 'mongoose';

export interface IOrder extends TDocument {
	user: ObjectId | string;
	deliveryAddress: IAddress;
	totalPrice: number;
	status: 'pending' | 'canceled' | 'delivered' | 'completed';
	observation?: string;
	products: {
		product: IProduct;
		quantity: number;
	}[];
}
