import { model, Schema } from 'mongoose';

// TS
import { IProduct } from '@ts';

const ProductSchema = new Schema<IProduct>(
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
