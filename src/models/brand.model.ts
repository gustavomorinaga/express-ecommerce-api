import { model, Schema } from 'mongoose';

// Config
import { aggregatePaginatePlugin } from '@config';

// TS
import {
	IBrand,
	IBrandDocument,
	IBrandMethods,
	IBrandModel,
	IBrandPaginateModel,
} from '@ts';

const BrandSchema = new Schema<IBrand, IBrandModel, IBrandMethods>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		description: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

BrandSchema.plugin(aggregatePaginatePlugin);

export const BrandModel = model<IBrandDocument, IBrandPaginateModel>(
	'Brand',
	BrandSchema
);
