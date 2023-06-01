import jwt, { type JwtPayload, type SignOptions } from 'jsonwebtoken';

// Config
import { environment } from '@config';

// Errors
import { handleError } from '@errors';

// TS
import { IUser } from '@ts';

export const generateAccessToken = (
	user: Partial<Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>>,
	secretType: 'access' | 'refresh',
	options?: SignOptions
) => {
	if (secretType === 'access' && !environment.JWT_SECRET)
		return handleError('JWT_SECRET not found');
	if (secretType === 'refresh' && !environment.JWT_REFRESH_SECRET)
		return handleError('JWT_REFRESH_SECRET not found');

	const secret =
		secretType === 'access' ? environment.JWT_SECRET : environment.JWT_REFRESH_SECRET;

	return jwt.sign(user, secret, options);
};

export const verifyAccessToken = (token: string) => {
	if (!environment.JWT_REFRESH_SECRET) return handleError('JWT_REFRESH_SECRET not found');

	return jwt.verify(token, environment.JWT_REFRESH_SECRET) as JwtPayload;
};
