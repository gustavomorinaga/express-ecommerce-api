import { Request, Response, NextFunction } from 'express';
import statuses from 'http-status';
import jwt from 'jsonwebtoken';

// Config
import { environment } from '@config';

// Errors
import { handleError } from '@errors';

// TS
import { IUser } from '@ts';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (!environment.JWT_SECRET)
		return handleError('JWT_SECRET not found', 'INTERNAL_SERVER_ERROR');

	const authHeader = req.headers['authorization'];
	const token = authHeader && authHeader.split(' ')[1];

	if (!token) return handleError('Token not found', 'UNAUTHORIZED');

	jwt.verify(token, environment.JWT_SECRET, (err, user) => {
		if (err) return handleError('Token has expired', 'UNAUTHORIZED');

		req._user = user as IUser;

		next();
	});
};
