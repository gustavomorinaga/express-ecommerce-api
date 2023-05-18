import { NextFunction, Request, Response } from 'express';
import statuses from 'http-status';

export const errorLogger = (
	err: Error & { status?: number },
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = err?.status || statuses.BAD_REQUEST;

	req.log.error(err);
	return res.status(status).json(err);
};
