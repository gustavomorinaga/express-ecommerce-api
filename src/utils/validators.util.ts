import { Request } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export async function zParse<T extends AnyZodObject>(
	schema: T,
	req: Request
): Promise<z.infer<T>> {
	try {
		return await schema.parseAsync(req);
	} catch (error) {
		throw fromZodError(error as ZodError);
	}
}
