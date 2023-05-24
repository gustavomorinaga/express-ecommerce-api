import { Document, Model, model, PaginateModel, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// Models
import { ProductModel, UserModel } from '@models';

// TS
import { ICart } from '@ts';

interface ICartDocument extends ICart, Document<string> {}
interface ICartModel extends Model<ICartDocument> {}
interface ICartMethods extends ICartDocument {
	checkCart: (cart: Omit<ICart, 'user'>) => Promise<boolean>;
}
interface ICartPaginateModel extends PaginateModel<ICartDocument, {}, ICartMethods> {}

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

CartSchema.pre('save', async function (next) {
	const cart = this;

	if (!cart.isNew) return next();

	const [user, products] = await Promise.all([
		UserModel.findById(cart.user).lean(),
		ProductModel.find({
			_id: { $in: cart.products.map(p => p.product) },
		}).lean(),
	]);
	if (!user) return next(new Error('Invalid user'));
	if (!products.length) return next(new Error('Cart is empty'));

	if (products.length !== cart.products.length)
		return next(new Error('Invalid products'));

	return next();
});

export const CartModel = model<ICartDocument, ICartPaginateModel>('Cart', CartSchema);
