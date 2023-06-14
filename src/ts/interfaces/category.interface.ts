import { Document, Model } from 'mongoose';

// TS
import { TDocument } from '@ts';

export interface IBaseCategory extends TDocument {
	name: string;
	description?: string;
}

export interface ICategory extends IBaseCategory {
	subCategories?: TDocument['_id'][];
}

export interface ICategoryPopulated extends IBaseCategory {
	subCategories: IBaseCategory[];
}

export interface ISubCategory extends IBaseCategory {}

export interface ICategoryDocument extends ICategory, Document<string> {}
export interface ICategoryModel extends Model<ICategoryDocument> {}
export interface ICategoryMethods extends ICategoryDocument {}

export interface ISubCategoryDocument extends ISubCategory, Document<string> {}
export interface ISubCategoryModel extends Model<ISubCategoryDocument> {}
export interface ISubCategoryMethods extends ISubCategoryDocument {}
