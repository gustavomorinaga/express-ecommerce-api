import { model, Schema } from 'mongoose';

// TS
import { ICategory, ICategoryDocument, ICategoryMethods, ICategoryModel } from '@ts';

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
		collation: { locale: 'en' },
	}
);
CategorySchema.add({ subCategories: [CategorySchema] });

CategorySchema.index({ name: 'text' });

export const CategoryModel = model<ICategoryDocument>('Category', CategorySchema);
