import { model, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

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
		slug: {
			type: String,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		stock: {
			type: Number,
			required: true,
			default: 0,
		},
		status: {
			type: String,
			enum: ['low-stock', 'out-of-stock', 'in-stock'],
			default: 'in-stock',
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	{ timestamps: true }
);

ProductSchema.plugin(paginatePlugin);

ProductSchema.pre('save', preSaveProductHook);
ProductSchema.pre('findOneAndUpdate', preUpdateProductHook);

export const ProductModel = model<IProductDocument, IProductPaginateModel>(
	'Product',
	ProductSchema
);
