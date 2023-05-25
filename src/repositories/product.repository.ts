// Schemas
import { ProductModel } from '@models';

// TS
import { IProduct, TQueryProduct } from '@ts';

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

		return await ProductModel.paginate(conditions);
	},

	async getProduct(id: string) {
		return await ProductModel.findById(id).lean();
	},

	async createProduct(product: Omit<IProduct, 'slug'> & Partial<Pick<IProduct, 'slug'>>) {
		return (await ProductModel.create(product)).toObject();
	},

	async updateProduct(id: string, product: Partial<IProduct>) {
		return await ProductModel.findByIdAndUpdate(id, product, {
			new: true,
		}).lean();
	},

	async deleteProduct(id: string) {
		return await ProductModel.findByIdAndDelete(id).lean();
	},
};
