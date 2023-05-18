import { Router } from 'express';
import statuses from 'http-status';

// Repositories
import { UserRepository } from '@repositories';

// Schemas
import {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
	updateUserPasswordSchema,
	deleteUserSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar as contas dos usuários */
const UserController = Router();

UserController.get('/', async (req, res) => {
	try {
		const users = await UserRepository.getUsers();

		return res.status(statuses.OK).send(users);
	} catch (error) {
		console.error(error);
	}
});

UserController.get('/:id', async (req, res) => {
	try {
		const {
			params: { id },
		} = await zParse(getUserSchema, req);

		const user = await UserRepository.getUser(id);

		return res.status(statuses.OK).send(user);
	} catch (error) {
		console.error(error);
	}
});

UserController.post('/', async (req, res) => {
	try {
		const { body: data } = await zParse(createUserSchema, req);

		const response = await UserRepository.createUser(data);

		return res.status(statuses.CREATED).send(response);
	} catch (error) {
		console.error(error);
	}
});

UserController.put('/:id', async (req, res) => {
	try {
		const {
			params: { id },
			body: data,
		} = await zParse(updateUserSchema, req);

		const response = await UserRepository.updateUser(id, data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		console.error(error);
	}
});

UserController.patch('/:id/password', async (req, res) => {
	try {
		const {
			params: { id },
			body: { password },
		} = await zParse(updateUserPasswordSchema, req);

		const response = await UserRepository.updateUserPassword(id, password);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		console.error(error);
	}
});

UserController.delete('/:id', async (req, res) => {
	try {
		const {
			params: { id },
		} = await zParse(deleteUserSchema, req);

		await UserRepository.deleteUser(id);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		console.error(error);
	}
});

export { UserController };
