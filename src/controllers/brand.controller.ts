import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { BrandRepository } from '@repositories';

// Middlewares
import { authMiddleware } from '@middlewares';

// Schemas
import {
	createBrandSchema,
	deleteBrandSchema,
	getBrandSchema,
	getBrandsSchema,
	updateBrandSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar as marcas dos produtos */
const BrandController = Router();

BrandController.get('/', async (req, res, next) => {
	try {
		const { query } = await zParse(getBrandsSchema, req);

		const carts = await BrandRepository.getBrands(query);

		return res.status(statuses.OK).send(carts);
	} catch (error) {
		next(error);
	}
});

BrandController.get('/:id', async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(getBrandSchema, req);

		const cart = await BrandRepository.getBrand(id);

		return res.status(statuses.OK).send(cart);
	} catch (error) {
		next(error);
	}
});

BrandController.post('/', authMiddleware, async (req, res, next) => {
	try {
		const { body: data } = await zParse(createBrandSchema, req);

		const response = await BrandRepository.createBrand(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		next(error);
	}
});

BrandController.put('/:id', authMiddleware, async (req, res, next) => {
	try {
		const {
			params: { id },
			body: data,
		} = await zParse(updateBrandSchema, req);

		const response = await BrandRepository.updateBrand(id, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

BrandController.delete('/:id', authMiddleware, async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(deleteBrandSchema, req);

		await BrandRepository.deleteBrand(id);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { BrandController };
