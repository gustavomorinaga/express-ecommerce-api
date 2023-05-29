import { model, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// Hooks
import { preSaveProductHook } from '@hooks';

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
		},
		slug: {
			type: String,
			unique: true,
		},
		description: {
			type: String,
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

ProductSchema.plugin(paginatePlugin);

ProductSchema.pre('save', preSaveProductHook);
// ProductSchema.pre('findOneAndUpdate', preUpdateProductHook);

export const ProductModel = model<IProductDocument, IProductPaginateModel>(
	'Product',
	ProductSchema
);
