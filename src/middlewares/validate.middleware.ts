import { Request, Response, NextFunction } from 'express';
import statuses from 'http-status';
import type { Schema, ZodError } from 'zod';

/** @deprecated */
export const validate =
	(schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});

			next();
		} catch (error) {
			return res.status(statuses.BAD_REQUEST).send((error as ZodError).errors);
		}
	};
