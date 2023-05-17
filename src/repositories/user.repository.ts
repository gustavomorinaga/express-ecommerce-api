// Configs
import { environment } from '@config';

// Schemas
import { UserModel } from '@models';

// TS
import { IUser } from '@ts';

export const UserRepository = {
	async getUsers() {
		try {
			const users = await UserModel.find().lean();

			return users;
		} catch (error) {
			console.error(error);
		}
	},

	async getUser(id: string) {
		try {
			const user = await UserModel.findById(id).lean();

			return user;
		} catch (error) {
			console.error(error);
		}
	},

	async createUser(user: IUser) {
		try {
			const userExists = await UserModel.findOne({ email: user.email }).lean();
			if (userExists) throw new Error('User already exists');

			user.avatar = `${environment.AVATAR_GENERATOR_URL}?seed=${user.name}`;

			const response = (await UserModel.create(user)).toObject();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async updateUser(id: string, data: IUser) {
		try {
			const user = await UserModel.findById(id).lean();
			if (!user) throw new Error('User not found');

			data.avatar = `${environment.AVATAR_GENERATOR_URL}?seed=${encodeURI(user.name)}`;

			const response = await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async updateUserPassword(id: string, password: string) {
		try {
			const response = await UserModel.findByIdAndUpdate(
				id,
				{ password },
				{ new: true }
			).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async deleteUser(id: string) {
		try {
			const response = await UserModel.findByIdAndDelete(id).lean();

			return response;
		} catch (error) {
			console.error(error);
		}
	},
};
