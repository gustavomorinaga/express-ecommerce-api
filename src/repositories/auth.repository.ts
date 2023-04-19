// Configs
import { environment } from '@config';

// Models
import { UserModel } from '@models';

// TS
import { IAuth, IUser } from '@ts';

export const AuthRepository = {
	async login({ email, password }: IAuth) {
		try {
			return await UserModel.findOne({ email, password }).lean();
		} catch (error) {
			console.error(error);
		}
	},

	async signUp(user: IUser) {
		try {
			user.avatar = `${environment.AVATAR_GENERATOR_URL}?seed=${user.name}`;

			const response = (await UserModel.create(user)).toObject();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async resetPassword({ email, password }: IAuth) {
		try {
			const response = await UserModel.findOneAndUpdate(
				{ email },
				{ password },
				{ new: true }
			).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},
};
