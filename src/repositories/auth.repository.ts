// Configs
import { environment } from '@config';

// Models
import { UserModel } from '@models';

// TS
import { IAuth, IUser } from '@ts';

export const AuthRepository = {
	async login({ email, password }: IAuth) {
		const user = await UserModel.findOne({ email }).populate('password');
		if (!user) return null;

		const isMatch = await user.comparePassword(password);

		return { user: user.toObject(), isMatch };
	},

	async signUp(user: IUser) {
		user.avatar = `${environment.AVATAR_GENERATOR_URL}?seed=${encodeURI(user.name)}`;

		const response = (await UserModel.create(user)).toObject();

		return response;
	},

	async resetPassword({ email, password }: IAuth) {
		const response = await UserModel.findOneAndUpdate(
			{ email },
			{ password },
			{ new: true }
		).lean();

		return response;
	},
};
