import { IAddress, TTimestamps } from '@ts';
import { IProduct } from './product.interface';
import type { ObjectId } from 'mongoose';

export interface IOrder extends TTimestamps {
	user: ObjectId | string;
	deliveryAddress: IAddress;
	totalPrice: number;
	status: 'pending' | 'canceled' | 'delivered';
	observation: string;
	products: [
		{
			product: IProduct;
			quantity: number;
		}
	];
}
