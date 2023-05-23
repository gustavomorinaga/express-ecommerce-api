import { TDocument } from '@ts';

export interface IProduct extends TDocument {
	name: string;
	description: string;
	price: number;
	stock: number;
}
