// Schemas
import { ProductModel } from '@models';

// TS
import { IProduct, TQueryProduct } from '@ts';

export const ProductRepository = {
	async getProducts(query: TQueryProduct) {
		const conditions: any = {};

		if (query.name) conditions.name = { $regex: query.name, $options: 'i' };
		if (query.price) conditions.price = Number(query.price);
		if (query.stock) conditions.stock = Number(query.stock);

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
