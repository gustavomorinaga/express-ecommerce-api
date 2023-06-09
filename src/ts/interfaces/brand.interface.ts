import { Document, Model, AggregatePaginateModel, PaginateModel } from 'mongoose';

// TS
import { TDocument } from '@ts';

export interface IBrand extends TDocument {
	name: string;
	description?: string;
}

export interface IBrandDocument extends IBrand, Document<string> {}
export interface IBrandModel extends Model<IBrandDocument> {}
export interface IBrandMethods extends IBrandDocument {}
