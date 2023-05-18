import { Request } from 'express';
import { AnyZodObject, ZodError, z } from 'zod';

export async function zParse<T extends AnyZodObject>(
	schema: T,
	req: Request
): Promise<z.infer<T>> {
	try {
		return schema.parseAsync(req);
	} catch (error) {
		if (error instanceof ZodError) throw new Error(error.message);

		return new Error(JSON.stringify(error));
	}
}
