import { Request, Response } from 'express';
import statuses from 'http-status';

export const errorLogger = (
	error: Error & { status?: number },
	req: Request,
	res: Response
) => {
	const status = error?.status || statuses.BAD_REQUEST;

	req.log.error(error);
	return res.status(status).send(error);
};
