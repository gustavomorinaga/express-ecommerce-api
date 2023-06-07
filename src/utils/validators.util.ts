import { AnyZodObject, ZodError, z } from 'zod';
import { fromZodError } from 'zod-validation-error';

export async function zParse<T extends AnyZodObject>(
	schema: T,
	data: any
): Promise<z.infer<T>> {
	try {
		return await schema.parseAsync(data);
	} catch (error) {
		throw fromZodError(error as ZodError);
	}
}
