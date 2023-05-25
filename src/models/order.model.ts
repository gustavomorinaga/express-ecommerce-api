import { model, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// Models
import { AddressSchema } from '@models';

// Hooks
import { preSaveOrderHook } from '@hooks';

// TS
import {
	IOrder,
	IOrderDocument,
	IOrderMethods,
	IOrderModel,
	IOrderPaginateModel,
} from '@ts';

const OrderSchema = new Schema<IOrder, IOrderModel, IOrderMethods>(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		deliveryAddress: AddressSchema.obj,
		totalPrice: {
			type: Number,
			required: true,
			default: 0,
		},
		status: {
			type: String,
			enum: ['pending', 'canceled', 'delivered', 'completed'],
			required: true,
			default: 'pending',
		},
		observation: {
			type: String,
			required: false,
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

OrderSchema.plugin(paginatePlugin);

OrderSchema.pre('save', preSaveOrderHook);

export const OrderModel = model<IOrderDocument, IOrderPaginateModel>(
	'Order',
	OrderSchema
);
