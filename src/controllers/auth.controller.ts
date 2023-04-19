import { Router } from 'express';

// Configs
import { environment, generateAccessToken, transporter } from '@config';

// Repositories
import { AuthRepository } from '@repositories';

// Middlewares
import { validate } from '@middlewares';

// Schemas
import { createUserSchema, loginAuthSchema } from '@schemas';

// TS
import { IAuth, IUser } from '@ts';

/** Responsável por gerenciar a autenticação dos usuários */
const AuthController = Router();

AuthController.post('/login', validate(loginAuthSchema), async (req, res) => {
	try {
		const auth: IAuth = req.body;

		const user = await AuthRepository.login(auth);
		if (!user) return res.sendStatus(401);

		const { password, createdAt, updatedAt, ...access } = user;

		const token = generateAccessToken(access, { expiresIn: '1h' });

		return res.send({ ...user, token });
	} catch (error) {
		console.error(error);
	}
});

AuthController.post('/signup', validate(createUserSchema), async (req, res) => {
	try {
		const data: IUser = req.body;

		const response = await AuthRepository.signUp(data);

		return res.send(response);
	} catch (error) {
		console.error(error);
	}
});

AuthController.post('/retrieve', async (req, res) => {
	try {
		const auth: IAuth = req.body;

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

		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
	}
});

AuthController.patch('/reset', async (req, res) => {
	try {
		const auth: IAuth = req.body;

		await AuthRepository.resetPassword(auth);

		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
	}
});

export { AuthController };
