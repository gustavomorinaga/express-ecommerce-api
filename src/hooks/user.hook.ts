import type { CallbackWithoutResultAndOptionalError } from 'mongoose';

// TS
import { IUserDocument, IUserMethods } from '@ts';

export const preSaveUserHook = async function (
	this: IUserDocument & IUserMethods,
	next: CallbackWithoutResultAndOptionalError
) {
	const user = this;

	user.avatar ??= user.generateAvatar(user.name);

	if (!user.isModified('password') || !user.isNew) return next();

	user.password = await user.generatePasswordHash(user.password);

	return next();
};
