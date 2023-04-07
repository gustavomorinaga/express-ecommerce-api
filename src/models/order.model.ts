import { model, Schema } from 'mongoose';

// TS
import { IOrder } from '@ts';

const OrderSchema = new Schema<IOrder>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		deliveryAddress: {
			street: {
				type: String,
				required: true,
			},
			number: {
				type: Number,
				required: true,
			},
			complement: {
				type: String,
			},
			neighborhood: {
				type: String,
				required: true,
			},
			city: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: true,
			},
			country: {
				type: String,
				required: true,
			},
			zipCode: {
				type: String,
				required: true,
			},
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		status: {
			type: String,
			enum: ['pending', 'canceled', 'delivered'],
			required: true,
			default: 'pending',
		},
		observation: {
			type: String,
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

export const OrderModel = model('Order', OrderSchema);
