// Schemas
import { ProductModel } from '@models';

// TS
import { IProduct, TQueryProduct } from '@ts';

export const ProductRepository = {
	async getProducts(query: TQueryProduct) {
		try {
			const conditions: any = {};

			if (query.name) conditions.name = { $regex: query.name, $options: 'i' };
			if (query.price) conditions.price = Number(query.price);
			if (query.stock) conditions.stock = Number(query.stock);

			const products = await ProductModel.find(conditions).lean();

			return products;
		} catch (error) {
			console.error(error);
		}
	},

	async getProduct(id: string) {
		try {
			const product = await ProductModel.findById(id).lean();

			return product;
		} catch (error) {
			console.error(error);
		}
	},

	async createProduct(product: IProduct) {
		try {
			const response = (await ProductModel.create(product)).toObject();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async updateProduct(id: string, product: Partial<IProduct>) {
		try {
			const response = await ProductModel.findByIdAndUpdate(id, product, {
				new: true,
			}).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async deleteProduct(id: string) {
		try {
			const response = await ProductModel.findByIdAndDelete(id).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},
};
