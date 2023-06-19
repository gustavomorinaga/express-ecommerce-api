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
	getFavoritesSchema,
	updateFavoriteSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

// Errors
import { handleError } from '@errors';

/** Responsável por gerenciar os produtos favoritos dos usuários */
const FavoriteController = Router();

FavoriteController.get('/', async (req, res, next) => {
	try {
		const { query } = await zParse(getFavoritesSchema, req);
		const { _id: authUserID, role } = req._user;

		if (role === 'user') query.userID = authUserID;

		const carts = await FavoriteRepository.getFavorites(query);

		return res.status(statuses.OK).send(carts);
	} catch (error) {
		next(error);
	}
});

FavoriteController.post('/', async (req, res, next) => {
	try {
		const { body: data } = await zParse(createFavoriteSchema, req);
		const { _id: authUserID, role } = req._user;

		if (role === 'user') data.user = authUserID;
		else if (!data.user)
			return handleError('User is required for admin users', 'BAD_REQUEST');

		const response = await FavoriteRepository.createFavorites(data);

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

		const response = await FavoriteRepository.updateFavorites(userID, data);

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

		const response = await FavoriteRepository.clearFavorites(userID);

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

		await FavoriteRepository.deleteFavorites(userID);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { FavoriteController };
