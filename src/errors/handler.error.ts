import statuses from 'http-status';

// TS
import { EHttpStatus } from '@ts';

export const handleError = (message: string, status: keyof typeof EHttpStatus) => {
	const error: Error & { status?: number } = new Error(message);
	error.status = statuses[status] || statuses.INTERNAL_SERVER_ERROR;

	throw error;
};
