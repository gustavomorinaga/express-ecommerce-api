import { model, Schema } from 'mongoose';

// Hooks
import { preSaveProductVariantHook } from '@hooks';

// TS
import {
	IProductVariant,
	IProductVariantDocument,
	IProductVariantMethods,
	IProductVariantModel,
} from '@ts';

const ProductVariantSchema = new Schema<
	IProductVariant,
	IProductVariantModel,
	IProductVariantMethods
>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		sku: {
			type: String,
			required: true,
			unique: true,
		},
		price: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		stock: {
			type: Number,
			required: true,
			min: 0,
			default: 0,
		},
		status: {
			type: String,
			enum: ['low-stock', 'out-of-stock', 'in-stock'],
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

ProductVariantSchema.pre('save', preSaveProductVariantHook);

ProductVariantSchema.index({ name: 'text', sku: 'text' });

export const ProductVariantModel = model<IProductVariantDocument>(
	'ProductVariant',
	ProductVariantSchema
);
