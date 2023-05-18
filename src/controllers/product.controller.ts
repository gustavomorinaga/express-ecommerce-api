import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { ProductRepository } from '@repositories';

// Middlewares
import { authenticateToken } from '@middlewares';

// Schemas
import {
	createProductSchema,
	deleteProductSchema,
	getProductSchema,
	getProductsSchema,
	updateProductSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar os produtos vendidos no e-commerce */
const ProductController = Router();

ProductController.get('/', async (req, res) => {
	try {
		const { query } = await zParse(getProductsSchema, req);

		const products = await ProductRepository.getProducts({
			...query,
			price: Number(query.price),
			stock: Number(query.stock),
		});

		return res.status(statuses.OK).send(products);
	} catch (error) {
		console.error(error);
	}
});

ProductController.get('/:id', async (req, res) => {
	try {
		const {
			params: { id },
		} = await zParse(getProductSchema, req);

		const product = await ProductRepository.getProduct(id);

		return res.status(statuses.OK).send(product);
	} catch (error) {
		console.error(error);
	}
});

ProductController.post('/', authenticateToken, async (req, res) => {
	try {
		const { body: data } = await zParse(createProductSchema, req);

		const response = await ProductRepository.createProduct(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		console.error(error);
	}
});

ProductController.put('/:id', authenticateToken, async (req, res) => {
	try {
		const {
			params: { id },
			body: data,
		} = await zParse(updateProductSchema, req);

		const response = await ProductRepository.updateProduct(id, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		console.error(error);
	}
});

ProductController.delete('/:id', authenticateToken, async (req, res) => {
	try {
		const {
			params: { id },
		} = await zParse(deleteProductSchema, req);

		await ProductRepository.deleteProduct(id);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		console.error(error);
	}
});

export { ProductController };
