import { TDocument } from '@ts';

export interface IProduct extends TDocument {
	slug: string;
	name: string;
	description: string;
	price: number;
	stock: number;
}
