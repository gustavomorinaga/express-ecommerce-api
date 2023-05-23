import jwt, { type SignOptions } from 'jsonwebtoken';

// Configs
import { environment } from '@config';

// TS
import { IUser } from '@ts';

export const generateAccessToken = (
	user: Partial<Omit<IUser, 'password' | 'createdAt' | 'updatedAt'>>,
	options?: SignOptions
) => {
	if (!environment.JWT_SECRET) throw new Error('JWT_SECRET not found!');

	return jwt.sign(user, environment.JWT_SECRET, options);
};
