import type { CallbackWithoutResultAndOptionalError } from 'mongoose';
import bcrypt from 'bcryptjs';

// Config
import { environment } from '@config';

// TS
import { IUserDocument } from '@ts';

export const preSaveUserHook = function (
	this: IUserDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	const user = this;

	user.avatar ??= `${environment.AVATAR_GENERATOR_URL}?seed=${encodeURI(user.name)}`;

	if (!user.isModified('password') || !user.isNew) return next();

	bcrypt.genSalt(environment.BCRYPT_SALT, function (error, salt) {
		if (error) return next(error);

		bcrypt.hash(user.password, salt, function (hashError, hash) {
			if (hashError) return next(hashError);

			user.password = hash;
			next();
		});
	});

	return next();
};
