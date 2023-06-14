import { model, Schema } from 'mongoose';

// TS
import {
	ISubCategory,
	ISubCategoryDocument,
	ISubCategoryMethods,
	ISubCategoryModel,
} from '@ts';

const SubCategorySchema = new Schema<
	ISubCategory,
	ISubCategoryModel,
	ISubCategoryMethods
>(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		description: {
			type: String,
			required: false,
			trim: true,
		},
	},
	{ timestamps: true, collation: { locale: 'en' } }
);

SubCategorySchema.index({ name: 'text' });

export const SubCategoryModel = model<ISubCategoryDocument>(
	'SubCategory',
	SubCategorySchema
);
