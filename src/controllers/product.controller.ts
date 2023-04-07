import { Router } from 'express';

// Repositories
import { ProductRepository } from '@repositories';

// Middlewares
import { validate } from '@middlewares';

// TS
import { IProduct, TQueryProduct } from '@ts';

// Schemas
import {
	createProductSchema,
	deleteProductSchema,
	getProductSchema,
	getProductsSchema,
	updateProductSchema,
} from '@schemas';

/** Responsável por gerenciar os produtos vendidos no e-commerce */
const ProductController = Router();

ProductController.get('/', validate(getProductsSchema), async (req, res) => {
	try {
		const query: TQueryProduct = req.query;

		const products = await ProductRepository.getProducts(query);

		return res.send(products);
	} catch (error) {
		console.error(error);
	}
});

ProductController.get('/:id', validate(getProductSchema), async (req, res) => {
	try {
		const { id } = req.params;

		const product = await ProductRepository.getProduct(id);

		return res.send(product);
	} catch (error) {
		console.error(error);
	}
});

ProductController.post('/', validate(createProductSchema), async (req, res) => {
	try {
		const data: IProduct = req.body;

		const response = await ProductRepository.createProduct(data);

		return res.send(response);
	} catch (error) {
		console.error(error);
	}
});

ProductController.put('/:id', validate(updateProductSchema), async (req, res) => {
	try {
		const { id } = req.params;
		const data: IProduct = req.body;

		const response = await ProductRepository.updateProduct(id, data);

		return res.send(response);
	} catch (error) {
		console.error(error);
	}
});

ProductController.delete('/:id', validate(deleteProductSchema), async (req, res) => {
	try {
		const { id } = req.params;

		await ProductRepository.deleteProduct(id);

		return res.send();
	} catch (error) {
		console.error(error);
	}
});

export { ProductController };
