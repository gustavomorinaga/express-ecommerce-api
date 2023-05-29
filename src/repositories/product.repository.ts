// Schemas
import { ProductModel, ProductVariantModel } from '@models';

// Functions
import { getProductStatus } from '@functions';

// TS
import { IProduct, IProductPopulated, TQueryProduct } from '@ts';

export const ProductRepository = {
	async getProducts(query: TQueryProduct) {
		const conditions = {
			...(query.name && { name: { $regex: query.name, $options: 'i' } }),
			...((query.startPrice || query.endPrice) && {
				price: {
					...(query.startPrice && { $gte: query.startPrice }),
					...(query.endPrice && { $lte: query.endPrice }),
				},
			}),
			...(query.hasEmptyStock && { stock: { $lte: 0 } }),
		};

		return await ProductModel.paginate(conditions, { populate: 'variants' });
	},

	async getProduct(id: IProduct['_id']) {
		return await ProductModel.findById(id).lean();
	},

	async createProduct(
		product: Omit<IProductPopulated, 'slug'> & Partial<Pick<IProductPopulated, 'slug'>>
	) {
		let variants: IProduct['variants'] = [];

		if (product.variants?.length) {
			product.variants = product.variants.map(variant => ({
				...variant,
				status: getProductStatus(variant.stock),
			}));

			const createdVariants = await ProductVariantModel.insertMany(product.variants);

			variants = createdVariants.map(variant => variant._id);
		}

		return (await ProductModel.create({ ...product, variants })).toObject();
	},

	async updateProduct(id: IProduct['_id'], product: DeepPartial<IProduct>) {
		return await ProductModel.findByIdAndUpdate(id, product, {
			new: true,
		}).lean();
	},

	async deleteProduct(id: IProduct['_id']) {
		return await ProductModel.findByIdAndDelete(id).lean();
	},
};
