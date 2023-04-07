import { Router } from 'express';

// Repositories
import { UserRepository } from '@repositories';

// Middlewares
import { validate } from '@middlewares';

// Schemas
import {
	createUserSchema,
	getUserSchema,
	updateUserSchema,
	updateUserPasswordSchema,
	deleteUserSchema,
} from '@schemas';

// TS
import { IUser } from '@ts';

/** Responsável por gerenciar as contas dos usuários */
const UserController = Router();

UserController.get('/', async (req, res) => {
	try {
		const users = await UserRepository.getUsers();

		return res.send(users);
	} catch (error) {
		console.error(error);
	}
});

UserController.get('/:id', validate(getUserSchema), async (req, res) => {
	try {
		const { id } = req.params;

		const user = await UserRepository.getUser(id);

		return res.send(user);
	} catch (error) {
		console.error(error);
	}
});

UserController.post('/', validate(createUserSchema), async (req, res) => {
	try {
		const data: IUser = req.body;

		const response = await UserRepository.createUser(data);

		return res.send(response);
	} catch (error) {
		console.error(error);
	}
});

UserController.put('/:id', validate(updateUserSchema), async (req, res) => {
	try {
		const { id } = req.params;
		const data: IUser = req.body;

		const response = await UserRepository.updateUser(id, data);

		return res.send(response);
	} catch (error) {
		console.error(error);
	}
});

UserController.patch(
	'/:id/password',
	validate(updateUserPasswordSchema),
	async (req, res) => {
		try {
			const { id } = req.params;
			const { password }: IUser = req.body;

			const response = await UserRepository.updateUserPassword(id, password);

			return res.send(response);
		} catch (error) {
			console.error(error);
		}
	}
);

UserController.delete('/:id', validate(deleteUserSchema), async (req, res) => {
	try {
		const { id } = req.params;

		await UserRepository.deleteUser(id);

		return res.send();
	} catch (error) {
		console.error(error);
	}
});

export { UserController };
