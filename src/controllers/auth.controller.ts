import { Router } from 'express';
import statuses from 'http-status';

// Config
import { environment, generateAccessToken, transporter } from '@config';

// Repositories
import { AuthRepository } from '@repositories';

// Schemas
import {
	createUserSchema,
	loginAuthSchema,
	resetAuthSchema,
	retrieveAuthSchema,
} from '@schemas';

// Utils
import { zParse } from '@utils';

/** Responsável por gerenciar a autenticação dos usuários */
const AuthController = Router();

AuthController.post('/login', async (req, res, next) => {
	try {
		const { body: auth } = await zParse(loginAuthSchema, req);

		const user = await AuthRepository.login(auth);
		const { password, createdAt, updatedAt, ...access } = user;

		const token = generateAccessToken(access, { expiresIn: '1h' });

		return res.status(statuses.OK).send({ ...user, token });
	} catch (error) {
		next(error);
	}
});

AuthController.post('/signup', async (req, res, next) => {
	try {
		const { body: data } = await zParse(createUserSchema, req);

		const response = await AuthRepository.signUp(data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

AuthController.post('/retrieve', async (req, res, next) => {
	try {
		const { body: auth } = await zParse(retrieveAuthSchema, req);

		const token = generateAccessToken(auth, { expiresIn: '30m' });

		await transporter.sendMail({
			from: environment.EMAIL_FROM,
			to: auth.email,
			subject: 'Recuperação de senha',
			html: `
				<h1>Recuperação de senha</h1>
				<p>Para recuperar sua senha, clique no link abaixo:</p>
				<a href="${req.headers.host}/reset/${token}">Recuperar senha</a>
			`,
		});

		return res.sendStatus(statuses.OK);
	} catch (error) {
		next(error);
	}
});

AuthController.patch('/reset', async (req, res, next) => {
	try {
		const { body: auth } = await zParse(resetAuthSchema, req);

		await AuthRepository.resetPassword(auth);

		return res.sendStatus(statuses.NO_CONTENT);
	} catch (error) {
		next(error);
	}
});

export { AuthController };
