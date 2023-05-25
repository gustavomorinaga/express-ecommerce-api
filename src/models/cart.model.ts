import { model, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// Functions
import { preSaveCartHook } from '@hooks';

// TS
import { ICart, ICartDocument, ICartMethods, ICartModel, ICartPaginateModel } from '@ts';

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

CartSchema.plugin(paginatePlugin);

CartSchema.pre('save', preSaveCartHook);

export const CartModel = model<ICartDocument, ICartPaginateModel>('Cart', CartSchema);
