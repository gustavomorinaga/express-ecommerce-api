import { TTimestamps } from '@ts';

export interface IProduct extends TTimestamps {
	name: string;
	description: string;
	price: number;
	stock: number;
}
