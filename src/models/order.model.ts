import { Document, Model, model, Schema } from 'mongoose';

// Models
import { AddressSchema } from '@models';

// TS
import { IOrder } from '@ts';

interface IOrderDocument extends IOrder, Document<string> {}
interface IOrderModel extends Model<IOrderDocument> {}
interface IOrderMethods extends IOrderDocument {}

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

OrderSchema.pre('save', async function (next) {
	const order = this;

	if (!order.isNew) return next();

	order.totalPrice = order.products.reduce(
		(acc, { product, quantity }) => acc + product.price * quantity,
		0
	);

	next();
});

export const OrderModel = model('Order', OrderSchema);
