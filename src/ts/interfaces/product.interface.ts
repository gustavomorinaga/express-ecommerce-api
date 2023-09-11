import { Document, Model, AggregatePaginateModel } from 'mongoose';

// TS
import { IBaseCategory, IBrand, TDocument } from '@ts';

export interface IProduct extends TDocument {
	slug: string;
	name: string;
	description: string;
	brand: TDocument['_id'];
	category: TDocument['_id'];
	subCategory: TDocument['_id'];
	active?: boolean;
	variants?: TDocument['_id'][];
}

export interface IProductVariant extends TDocument {
	name: string;
	sku: string;
	price: number;
	originalPrice?: number;
	stock: number;
	status?: 'low-stock' | 'out-of-stock' | 'in-stock';
	active?: boolean;
}

export interface IProductPopulated
	extends Omit<IProduct, 'brand' | 'category' | 'subCategory' | 'variants'> {
	brand: IBrand;
	category: IBaseCategory;
	subCategory: IBaseCategory;
	variants: IProductVariant[];
}

export interface IProductDocument extends IProduct, Document<string> {}
export interface IProductModel extends Model<IProductDocument> {}
export interface IProductMethods extends IProductDocument {}
export interface IProductPaginateModel extends AggregatePaginateModel<IProductDocument> {}

export interface IProductVariantDocument extends IProductVariant, Document<string> {}
export interface IProductVariantModel extends Model<IProductVariantDocument> {}
export interface IProductVariantMethods extends IProductVariantDocument {}
