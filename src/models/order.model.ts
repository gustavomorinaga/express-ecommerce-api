import { model, Schema } from 'mongoose';

// Config
import { aggregatePaginatePlugin } from '@config';

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
			trim: true,
		},
		products: [OrderProductSchema],
	},
	{ timestamps: true, collation: { locale: 'en' } }
);

OrderSchema.plugin(aggregatePaginatePlugin);

OrderSchema.pre('save', preSaveOrderHook);
OrderSchema.pre('findOneAndUpdate', preFindAndUpdateOrderHook);

OrderSchema.index({ orderID: 'text' });

export const OrderModel = model<IOrderDocument, IOrderPaginateModel>(
	'Order',
	OrderSchema
);
