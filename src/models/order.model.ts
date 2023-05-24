import { Document, Model, model, PaginateModel, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// Models
import { AddressSchema, ProductModel } from '@models';

// TS
import { IOrder, IOrderPopulated } from '@ts';

interface IOrderDocument extends IOrder, Document<string> {}
interface IOrderModel extends Model<IOrderDocument> {}
interface IOrderMethods extends IOrderDocument {}
interface IOrderPaginateModel extends PaginateModel<IOrderDocument, {}, IOrderMethods> {}

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

OrderSchema.pre('save', async function (next) {
	const order = await this.populate<IOrderPopulated>('products.product');

	if (!order.isNew) return next();

	order.totalPrice = order.products.reduce(
		(acc, { product: { price }, quantity }) => acc + price * quantity,
		0
	);

	await Promise.all(
		order.products.map(({ product, quantity }) =>
			ProductModel.findByIdAndUpdate(product._id, {
				$inc: { stock: -quantity },
			})
		)
	);

	return next();
});

export const OrderModel = model<IOrderDocument, IOrderPaginateModel>(
	'Order',
	OrderSchema
);
