import { Router } from 'express';
import statuses from 'http-status';

// Config
import {
	environment,
	generateAccessToken,
	transporter,
	verifyAccessToken,
} from '@config';

// Repositories
import { AuthRepository, UserRepository } from '@repositories';

// Schemas
import {
	createUserSchema,
	loginAuthSchema,
	refreshAuthSchema,
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

		const accessToken = generateAccessToken(access, 'access', { expiresIn: '1h' }); // 1 hour
		const refreshToken = generateAccessToken({ email: access.email }, 'refresh', {
			expiresIn: '1d',
		}); // 1 day

		const response = { accessToken, refreshToken };

		res.cookie('jwt', refreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		return res.status(statuses.OK).send(response);
	} catch (error) {
		next(error);
	}
});

AuthController.post('/refresh', async (req, res, next) => {
	try {
		const {
			cookies: { jwt: refreshToken },
		} = await zParse(refreshAuthSchema, req);

		const accepted = verifyAccessToken(refreshToken);

		const user = await UserRepository.getUserByEmail(accepted.email as string);
		const { createdAt, updatedAt, ...access } = user;

		const newAccessToken = generateAccessToken(access, 'access', { expiresIn: '1h' }); // 1 hour
		const newRefreshToken = generateAccessToken(
			{ email: accepted.email as string },
			'refresh',
			{ expiresIn: '1d' }
		); // 1 day

		const response = { accessToken: newAccessToken, refreshToken: newRefreshToken };

		res.cookie('jwt', newRefreshToken, {
			httpOnly: true,
			secure: true,
			maxAge: 24 * 60 * 60 * 1000, // 1 day
		});

		return res.status(statuses.OK).send(response);
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

		const token = generateAccessToken(auth, 'refresh', { expiresIn: '30m' });

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
