import { Document, Model, model, Schema } from 'mongoose';

// Models
import { ProductModel } from '@models';

// TS
import { ICart } from '@ts';

interface ICartDocument extends ICart, Document<string> {}
interface ICartModel extends Model<ICartDocument> {}
interface ICartMethods extends ICartDocument {
	checkCart: (cart: Omit<ICart, 'user'>) => Promise<boolean>;
}

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

CartSchema.methods.checkCart = async function (cart) {
	const products = await ProductModel.find({
		_id: { $in: cart.products.map(p => p.product) },
	}).lean();

	return products.length === cart.products.length;
};

export const CartModel = model('Cart', CartSchema);
