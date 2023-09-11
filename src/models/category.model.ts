import { model, Schema } from 'mongoose';

// Hooks
import { preUpdateCategoryHook } from '@hooks';

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
		subCategories: [{ type: Schema.Types.ObjectId, ref: 'SubCategory' }],
	},
	{ timestamps: true, collation: { locale: 'en' } }
);

CategorySchema.pre('findOneAndUpdate', preUpdateCategoryHook);

CategorySchema.index({ name: 'text' });

export const CategoryModel = model<ICategoryDocument>('Category', CategorySchema);
