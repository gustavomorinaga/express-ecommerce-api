import { Request, Response, NextFunction } from 'express';
import statuses from 'http-status';
import jwt from 'jsonwebtoken';

// Config
import { environment } from '@config';

// TS
import { IUser } from '@ts';
import { handleError } from '@errors';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (!environment.JWT_SECRET) throw new Error('JWT_SECRET not found!');

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return res.sendStatus(statuses.UNAUTHORIZED);

	jwt.verify(token, environment.JWT_SECRET, (err: any, user: any) => {
		if (err) return handleError('Token has expired', 'UNAUTHORIZED');

		req._user = user as IUser;

		next();
	});
};
