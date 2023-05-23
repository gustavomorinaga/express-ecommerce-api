// Models
import { UserModel } from '@models';

// Errors
import { handlerError } from '@errors';

// TS
import { IAuth, IUser } from '@ts';

export const AuthRepository = {
	async login({ email, password }: IAuth) {
		const user = await UserModel.findOne({ email }).populate('password');
		if (!user) return handlerError('User not found', 'NOT_FOUND');

		const isMatch = await user.comparePassword(password);
		if (!isMatch) return handlerError('Invalid password', 'UNAUTHORIZED');

		return user.toObject();
	},

	async signUp(user: IUser) {
		return (await UserModel.create(user)).toObject();
	},

	async resetPassword({ email, password }: IAuth) {
		return await UserModel.findOneAndUpdate(
			{ email },
			{ password },
			{ new: true }
		).lean();
	},
};
