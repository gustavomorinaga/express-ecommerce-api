import { model, Schema } from 'mongoose';

// TS
import { ICart } from '@ts';

const CartSchema = new Schema<ICart>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
				},
			},
		],
	},
	{ timestamps: true }
);

export const CartModel = model('Cart', CartSchema);
