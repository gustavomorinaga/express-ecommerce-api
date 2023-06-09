import { AggregatePaginateModel, Document, Model } from 'mongoose';

export interface ICategory {
	name: string;
	subCategories?: ISubCategory[];
}

export interface ISubCategory extends Pick<ICategory, 'name'> {}

export interface ICategoryDocument extends ICategory, Document<string> {}
export interface ICategoryModel extends Model<ICategoryDocument> {}
export interface ICategoryMethods extends ICategoryDocument {}
export interface ICategoryPaginateModel
	extends AggregatePaginateModel<ICategoryDocument> {}

export interface ISubCategoryDocument extends ISubCategory, Document<string> {}
export interface ISubCategoryModel extends Model<ISubCategoryDocument> {}
export interface ISubCategoryMethods extends ISubCategoryDocument {}
