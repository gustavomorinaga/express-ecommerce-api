import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { UserRepository } from '@repositories';

// Middlewares
import { isAdminMiddleware } from '@middlewares';

// Schemas
import {
	createUserSchema,
	getUsersSchema,
	getUserSchema,
	updateUserSchema,
	updateUserPasswordSchema,
	updateUserActiveSchema,
	deleteUserSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar as contas dos usuários */
const UserController = Router();

UserController.get('/', isAdminMiddleware, async (req, res, next) => {
	try {
		const { query } = await zParse(getUsersSchema, req);

		const users = await UserRepository.getUsers(query);

		return res.status(statuses.OK).send(users);
	} catch (error) {
		next(error);
	}
});

UserController.get('/:id', async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(getUserSchema, req);

		const user = await UserRepository.getUser(id);

		return res.status(statuses.OK).send(user);
	} catch (error) {
		next(error);
	}
});

UserController.post('/', isAdminMiddleware, async (req, res, next) => {
	try {
		const { body: data } = await zParse(createUserSchema, req);

		const response = await UserRepository.createUser(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		next(error);
	}
});

UserController.put('/:id', async (req, res, next) => {
	try {
		const {
			params: { id },
			body: data,
		} = await zParse(updateUserSchema, req);

		const response = await UserRepository.updateUser(id, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

UserController.patch('/:id/password', async (req, res, next) => {
	try {
		const {
			params: { id },
			body: { password },
		} = await zParse(updateUserPasswordSchema, req);

		const response = await UserRepository.updateUserPassword(id, password);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

UserController.patch('/:id/change-active', async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(updateUserActiveSchema, req);

		const response = await UserRepository.changeUserActive(id);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

UserController.delete('/:id', isAdminMiddleware, async (req, res, next) => {
	try {
		const {
			params: { id },
		} = await zParse(deleteUserSchema, req);

		await UserRepository.deleteUser(id);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { UserController };
