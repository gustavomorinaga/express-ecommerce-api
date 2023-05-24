import { Document, Model, model, PaginateModel, Schema } from 'mongoose';

// Config
import { paginatePlugin } from '@config';

// Utils
import { slugify } from '@utils';

// TS
import { IProduct } from '@ts';

interface IProductDocument extends IProduct, Document<string> {}
interface IProductModel extends Model<IProductDocument> {}
interface IProductMethods extends IProductDocument {}
interface IProductPaginateModel
	extends PaginateModel<IProductDocument, {}, IProductMethods> {}

const ProductSchema = new Schema<IProduct, IProductModel, IProductMethods>(
	{
		slug: {
			type: String,
			unique: true,
		},
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		stock: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

ProductSchema.plugin(paginatePlugin);

ProductSchema.pre('save', function (next) {
	const product = this;

	if (!product.isModified('name')) return next();

	product.slug = slugify(product.name);

	return next();
});

export const ProductModel = model<IProductDocument, IProductPaginateModel>(
	'Product',
	ProductSchema
);
