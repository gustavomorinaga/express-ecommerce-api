import { Request, Response, NextFunction } from 'express';

// Errors
import { handleError } from '@errors';

export const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
	if (req._user.role !== 'admin') return handleError('User unauthorized', 'UNAUTHORIZED');

	next();
};
