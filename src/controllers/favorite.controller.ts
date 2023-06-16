import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { FavoriteRepository } from '@repositories';

// Middlewares
import { isAdminMiddleware } from '@middlewares';

// Schemas
import {
	clearFavoriteSchema,
	createFavoriteSchema,
	deleteFavoriteSchema,
	getFavoriteSchema,
	updateFavoriteSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar os produtos favoritos dos usuários */
const FavoriteController = Router();

FavoriteController.get('/', isAdminMiddleware, async (req, res, next) => {
	try {
		const carts = await FavoriteRepository.getFavorites();

		return res.status(statuses.OK).send(carts);
	} catch (error) {
		next(error);
	}
});

FavoriteController.get('/:userID', async (req, res, next) => {
	try {
		const {
			params: { userID },
		} = await zParse(getFavoriteSchema, req);

		const cart = await FavoriteRepository.getUserFavorites(userID);

		return res.status(statuses.OK).send(cart);
	} catch (error) {
		next(error);
	}
});

FavoriteController.post('/', async (req, res, next) => {
	try {
		const { body: data } = await zParse(createFavoriteSchema, req);

		const response = await FavoriteRepository.createUserFavorites(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		next(error);
	}
});

FavoriteController.put('/:userID', async (req, res, next) => {
	try {
		const {
			params: { userID },
			body: data,
		} = await zParse(updateFavoriteSchema, req);

		const response = await FavoriteRepository.updateUserFavorites(userID, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

FavoriteController.patch('/:userID/clear', async (req, res, next) => {
	try {
		const {
			params: { userID },
		} = await zParse(clearFavoriteSchema, req);

		const response = await FavoriteRepository.clearUserFavorites(userID);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

FavoriteController.delete('/:userID', isAdminMiddleware, async (req, res, next) => {
	try {
		const {
			params: { userID },
		} = await zParse(deleteFavoriteSchema, req);

		await FavoriteRepository.deleteUserFavorites(userID);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { FavoriteController };
