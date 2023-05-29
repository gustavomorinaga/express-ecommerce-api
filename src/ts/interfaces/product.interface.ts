import { Document, Model, PaginateModel } from 'mongoose';

// TS
import { TDocument } from '@ts';

export interface IProduct extends TDocument {
	slug: string;
	name: string;
	description: string;
	active?: boolean;
	variants?: TDocument['_id'][];
}

export interface IProductPopulated extends Omit<IProduct, 'variants'> {
	variants: IProductVariant[];
}

export interface IProductVariant {
	name: string;
	sku: string;
	price: number;
	stock: number;
	status?: 'low-stock' | 'out-of-stock' | 'in-stock';
	active?: boolean;
}

export interface IProductDocument extends IProduct, Document<string> {}
export interface IProductModel extends Model<IProductDocument> {}
export interface IProductMethods extends IProductDocument {}
export interface IProductPaginateModel
	extends PaginateModel<IProductDocument, {}, IProductMethods> {}

export interface IProductVariantDocument extends IProductVariant, Document<string> {}
export interface IProductVariantModel extends Model<IProductVariantDocument> {}
export interface IProductVariantMethods extends IProductVariantDocument {}
