import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Configs
import { environment } from '@config';

// TS
import { IUser } from '@ts';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	if (!environment.JWT_SECRET) throw new Error('JWT_SECRET not found!');

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(401);

	jwt.verify(token, environment.JWT_SECRET, (err: any, user: any) => {
		console.error(err);

		if (err) return res.sendStatus(403);

		req.body._user = user as IUser;

		next();
	});
};
