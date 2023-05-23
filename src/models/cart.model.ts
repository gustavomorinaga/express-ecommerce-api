import { Document, Model, model, Schema } from 'mongoose';

// TS
import { ICart } from '@ts';

interface ICartDocument extends ICart, Document {}
interface ICartModel extends Model<ICartDocument> {}
interface ICartMethods extends ICartDocument {}

const CartSchema = new Schema<ICart, ICartModel, ICartMethods>(
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
