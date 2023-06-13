import { model, Schema } from 'mongoose';

// Config
import { aggregatePaginatePlugin } from '@config';

// TS
import {
	ICategory,
	ICategoryDocument,
	ICategoryMethods,
	ICategoryModel,
	ICategoryPaginateModel,
} from '@ts';

const CategorySchema = new Schema<ICategory, ICategoryModel, ICategoryMethods>(
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
	{
		timestamps: true,
	}
);
CategorySchema.add({ subCategories: [CategorySchema] });

CategorySchema.plugin(aggregatePaginatePlugin);

CategorySchema.index({ name: 'text' });

export const CategoryModel = model<ICategoryDocument, ICategoryPaginateModel>(
	'Category',
	CategorySchema
);
