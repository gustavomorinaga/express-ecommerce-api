import { Document, Model, model, Schema } from 'mongoose';

// TS
import { IProduct } from '@ts';

interface IProductDocument extends IProduct, Document {}
interface IProductModel extends Model<IProductDocument> {}
interface IProductMethods extends IProductDocument {}

const ProductSchema = new Schema<IProduct, IProductModel, IProductMethods>(
	{
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
		},
		stock: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

export const ProductModel = model('Product', ProductSchema);
