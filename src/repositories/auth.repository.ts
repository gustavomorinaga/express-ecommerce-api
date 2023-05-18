// Configs
import { environment } from '@config';

// Models
import { UserModel } from '@models';

// TS
import { IAuth, IUser } from '@ts';

export const AuthRepository = {
	async login({ email, password }: IAuth) {
		return await UserModel.findOne({ email, password }).lean();
	},

	async signUp(user: IUser) {
		user.avatar = `${environment.AVATAR_GENERATOR_URL}?seed=${user.name}`;

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
