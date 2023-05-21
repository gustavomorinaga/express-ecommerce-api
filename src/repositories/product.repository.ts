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

		console.log(conditions);

		const products = await ProductModel.find(conditions).lean();

		return products;
	},

	async getProduct(id: string) {
		const product = await ProductModel.findById(id).lean();

		return product;
	},

	async createProduct(product: IProduct) {
		const response = (await ProductModel.create(product)).toObject();

		return response;
	},

	async updateProduct(id: string, product: Partial<IProduct>) {
		const response = await ProductModel.findByIdAndUpdate(id, product, {
			new: true,
		}).lean();

		return response;
	},

	async deleteProduct(id: string) {
		const response = await ProductModel.findByIdAndDelete(id).lean();

		return response;
	},
};
