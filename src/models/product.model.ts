import { model, Schema } from 'mongoose';

// Config
import { aggregatePaginatePlugin } from '@config';

// Hooks
import { preSaveProductHook, preUpdateProductHook } from '@hooks';

// TS
import {
	IProduct,
	IProductDocument,
	IProductMethods,
	IProductModel,
	IProductPaginateModel,
} from '@ts';

const ProductSchema = new Schema<IProduct, IProductModel, IProductMethods>(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		slug: {
			type: String,
			unique: true,
		},
		description: {
			type: String,
			required: true,
			trim: true,
		},
		brand: {
			type: Schema.Types.ObjectId,
			ref: 'Brand',
			required: true,
		},
		category: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
			required: true,
		},
		active: {
			type: Boolean,
			default: true,
		},
		variants: [{ type: Schema.Types.ObjectId, ref: 'ProductVariant' }],
	},
	{ timestamps: true }
);

ProductSchema.plugin(aggregatePaginatePlugin);

ProductSchema.pre('save', preSaveProductHook);
ProductSchema.pre('findOneAndUpdate', preUpdateProductHook);

ProductSchema.index({ name: 'text', description: 'text' });

export const ProductModel = model<IProductDocument, IProductPaginateModel>(
	'Product',
	ProductSchema
);
