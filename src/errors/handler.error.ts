import statuses from 'http-status';

// TS
import { EHttpStatus } from '@ts';

export const handlerError = (message: string, status: keyof typeof EHttpStatus) => {
	const error: Error & { status?: number } = new Error(message);
	error.status = statuses[status] as number;

	throw error;
};
