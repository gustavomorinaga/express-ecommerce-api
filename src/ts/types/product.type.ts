import { IProduct } from '@ts';

export type TQueryProduct = Partial<
	Omit<IProduct, '_id' | 'description' | 'createdAt' | 'updatedAt'>
>;
