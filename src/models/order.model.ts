import { model, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// Models
import { AddressSchema } from '@models';

// Hooks
import { preFindAndUpdateOrderHook, preSaveOrderHook } from '@hooks';

// TS
import {
	IOrder,
	IOrderDocument,
	IOrderMethods,
	IOrderModel,
	IOrderPaginateModel,
} from '@ts';

const OrderProductSchema = new Schema({
	product: {
		type: Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	},
	variant: {
		type: Schema.Types.ObjectId,
		ref: 'ProductVariant',
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const OrderSchema = new Schema<IOrder, IOrderModel, IOrderMethods>(
	{
		orderID: {
			type: String,
			unique: true,
		},
		user: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		deliveryAddress: {
			type: AddressSchema,
			required: true,
		},
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
		products: [OrderProductSchema],
	},
	{ timestamps: true }
);

OrderSchema.plugin(paginatePlugin);

OrderSchema.pre('save', preSaveOrderHook);
OrderSchema.pre('findOneAndUpdate', preFindAndUpdateOrderHook);

export const OrderModel = model<IOrderDocument, IOrderPaginateModel>(
	'Order',
	OrderSchema
);
