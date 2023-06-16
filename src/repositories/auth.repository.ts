// Models
import { UserModel } from '@models';

// Errors
import { handleError } from '@errors';

// TS
import { IUser, TAuthLogin, TAuthReset, TUserCreate } from '@ts';

export const AuthRepository = {
	async login({ email, password }: TAuthLogin) {
		const user = await UserModel.findOne({ email }).populate('password');
		if (!user) return handleError('User not found', 'NOT_FOUND');

		const isMatch = await user.comparePassword(password);
		if (!isMatch) return handleError('Invalid password', 'UNAUTHORIZED');

		return user.toObject<IUser>();
	},

	async signUp(user: TUserCreate) {
		return (await UserModel.create(user)).toObject<IUser>();
	},

	async resetPassword({ email, password }: TAuthReset) {
		return await UserModel.findOneAndUpdate(
			{ email },
			{ password },
			{ new: true }
		).lean<IUser>();
	},
};
