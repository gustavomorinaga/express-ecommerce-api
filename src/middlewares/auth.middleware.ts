import { Request, Response, NextFunction } from 'express';
import statuses from 'http-status';
import jwt from 'jsonwebtoken';

// Configs
import { environment } from '@config';

// TS
import { IUser } from '@ts';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
	if (!environment.JWT_SECRET) throw new Error('JWT_SECRET not found!');

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(statuses.UNAUTHORIZED);

	jwt.verify(token, environment.JWT_SECRET, (err: any, user: any) => {
		if (err) return next(err);

		req._user = user as IUser;

		next();
	});
};
