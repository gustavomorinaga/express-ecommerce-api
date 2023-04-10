import { Request, Response } from 'express';

export const errorLogger = (
	error: Error & { status?: number },
	req: Request,
	res: Response
) => {
	const status = error.status || 400;

	req.log.error(error);
	return res.status(status).send(error);
};
