import { model, Schema } from 'mongoose';

// TS
import { IBrand, IBrandDocument, IBrandMethods, IBrandModel } from '@ts';

const BrandSchema = new Schema<IBrand, IBrandModel, IBrandMethods>(
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

BrandSchema.index({ name: 'text' });

export const BrandModel = model<IBrandDocument>('Brand', BrandSchema);
