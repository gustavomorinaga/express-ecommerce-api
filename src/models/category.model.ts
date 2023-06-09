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
		subCategories: [
			{
				type: Schema.Types.ObjectId,
				ref: 'SubCategory',
			},
		],
	},
	{
		timestamps: true,
	}
);

CategorySchema.plugin(aggregatePaginatePlugin);

export const CategoryModel = model<ICategoryDocument, ICategoryPaginateModel>(
	'Category',
	CategorySchema
);
