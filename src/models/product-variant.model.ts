import { model, Schema } from 'mongoose';

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
		},
		sku: {
			type: String,
			required: true,
			unique: true,
			sparse: true,
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

export const ProductVariantModel = model<IProductVariantDocument>(
	'ProductVariant',
	ProductVariantSchema
);
