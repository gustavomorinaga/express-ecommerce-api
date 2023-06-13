import { AggregatePaginateModel, Document, Model } from 'mongoose';

// TS
import { TDocument } from '@ts';

export interface IBaseCategory extends TDocument {
	name: string;
	description?: string;
}

export interface ICategory extends IBaseCategory {
	subCategories?: IBaseCategory[];
}

export interface ICategoryDocument extends ICategory, Document<string> {}
export interface ICategoryModel extends Model<ICategoryDocument> {}
export interface ICategoryMethods extends ICategoryDocument {}
