import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { ProductRepository } from '@repositories';

// Middlewares
import { authMiddleware, isAdminMiddleware } from '@middlewares';

// Schemas
import {
	createProductSchema,
	deleteProductSchema,
	deleteProductVariantSchema,
	getProductSchema,
	getProductsSchema,
	updateProductSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar os produtos vendidos no e-commerce */
const ProductController = Router();

ProductController.get('/', async (req, res, next) => {
	try {
		const { query } = await zParse(getProductsSchema, req);

		const products = await ProductRepository.getProducts(query);

		return res.status(statuses.OK).send(products);
	} catch (error) {
		next(error);
	}
});

ProductController.get('/:id', async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(getProductSchema, req);

		const product = await ProductRepository.getProduct(id);

		return res.status(statuses.OK).send(product);
	} catch (error) {
		next(error);
	}
});

ProductController.post(
	'/',
	...[authMiddleware, isAdminMiddleware],
	async (req, res, next) => {
		try {
			const { body: data } = await zParse(createProductSchema, req);

			const response = await ProductRepository.createProduct(data);

			return res.status(statuses.CREATED).send(response);
		} catch (error) {
			next(error);
		}
	}
);

ProductController.put(
	'/:id',
	...[authMiddleware, isAdminMiddleware],
	async (req, res, next) => {
		try {
			const {
				params: { id },
				body: data,
			} = await zParse(updateProductSchema, req);

			const response = await ProductRepository.updateProduct(id, data);

			return res.status(statuses.OK).send(response);
		} catch (error) {
			next(error);
		}
	}
);

ProductController.delete(
	'/:id',
	...[authMiddleware, isAdminMiddleware],
	async (req, res, next) => {
		try {
			const {
				params: { id },
			} = await zParse(deleteProductSchema, req);

			await ProductRepository.deleteProduct(id);

			return res.sendStatus(statuses.NO_CONTENT);
		} catch (error) {
			next(error);
		}
	}
);

ProductController.delete(
	'/:id/variants/:idVariant',
	...[authMiddleware, isAdminMiddleware],
	async (req, res, next) => {
		try {
			const {
				params: { id, idVariant },
			} = await zParse(deleteProductVariantSchema, req);

			await ProductRepository.deleteProductVariant(id, idVariant);

			return res.sendStatus(statuses.NO_CONTENT);
		} catch (error) {
			next(error);
		}
	}
);

export { ProductController };
