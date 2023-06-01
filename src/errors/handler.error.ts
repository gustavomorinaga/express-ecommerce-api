import statuses from 'http-status';

// TS
import { EHttpStatus } from '@ts';

export const handleError = (
	message: string,
	status: keyof typeof EHttpStatus = 'INTERNAL_SERVER_ERROR'
) => {
	const error: Error & { status?: number } = new Error(message);
	error.status = statuses[status];

	throw error;
};
