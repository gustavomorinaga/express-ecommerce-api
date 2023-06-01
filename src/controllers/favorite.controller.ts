import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { FavoriteRepository } from '@repositories';

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

FavoriteController.get('/', async (req, res, next) => {
	try {
		const carts = await FavoriteRepository.getFavorites();

		return res.status(statuses.OK).send(carts);
	} catch (error) {
		next(error);
	}
});

FavoriteController.get('/:userId', async (req, res, next) => {
	try {
		const {
			params: { userId },
		} = await zParse(getFavoriteSchema, req);

		const cart = await FavoriteRepository.getUserFavorites(userId);

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

FavoriteController.put('/:userId', async (req, res, next) => {
	try {
		const {
			params: { userId },
			body: data,
		} = await zParse(updateFavoriteSchema, req);

		const response = await FavoriteRepository.updateUserFavorites(userId, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

FavoriteController.patch('/:userId/clear', async (req, res, next) => {
	try {
		const {
			params: { userId },
		} = await zParse(clearFavoriteSchema, req);

		const response = await FavoriteRepository.clearUserFavorites(userId);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

FavoriteController.delete('/:userId', async (req, res, next) => {
	try {
		const {
			params: { userId },
		} = await zParse(deleteFavoriteSchema, req);

		await FavoriteRepository.deleteUserFavorites(userId);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { FavoriteController };
