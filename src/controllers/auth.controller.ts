import { Router } from 'express';
import statuses from 'http-status';

// Configs
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

AuthController.post('/login', async (req, res) => {
	try {
		const { body: auth } = await zParse(loginAuthSchema, req);

		const user = await AuthRepository.login(auth);
		if (!user) return res.sendStatus(statuses.UNAUTHORIZED);

		const { password, createdAt, updatedAt, ...access } = user;

		const token = generateAccessToken(access, { expiresIn: '1h' });

		return res.status(statuses.OK).send({ ...user, token });
	} catch (error) {
		console.error(error);
	}
});

AuthController.post('/signup', async (req, res) => {
	try {
		const { body: data } = await zParse(createUserSchema, req);

		const response = await AuthRepository.signUp(data);

		return res.status(statuses.OK).send(response);
	} catch (error) {
		console.error(error);
	}
});

AuthController.post('/retrieve', async (req, res) => {
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
				<a href="${environment.APP_URL}/reset/${token}">Recuperar senha</a>
			`,
		});

		return res.sendStatus(statuses.OK);
	} catch (error) {
		console.error(error);
	}
});

AuthController.patch('/reset', async (req, res) => {
	try {
		const { body: auth } = await zParse(resetAuthSchema, req);

		await AuthRepository.resetPassword(auth);

		return res.sendStatus(statuses.OK);
	} catch (error) {
		console.error(error);
	}
});

export { AuthController };
