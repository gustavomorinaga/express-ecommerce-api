import { NextFunction, Request, Response } from 'express';
import statuses from 'http-status';

export const errorLogger = (
	err: Error & { status?: number },
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const error = {
		name: err.name,
		message: err.message,
		stack: err?.stack || null,
		status: err?.status || statuses.BAD_REQUEST,
	};

	req.log.error(error);
	return res.status(error.status).send({ error });
};
