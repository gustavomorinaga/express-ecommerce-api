// Configs
import { environment } from '@config';

// Schemas
import { UserModel } from '@models';

// TS
import { IUser } from '@ts';

export const UserRepository = {
	async getUsers() {
		const users = await UserModel.find().lean();

		return users;
	},

	async getUser(id: string) {
		const user = await UserModel.findById(id).lean();

		return user;
	},

	async createUser(user: IUser) {
		const userExists = await UserModel.findOne({ email: user.email }).lean();
		if (userExists) throw new Error('User already exists');

		user.avatar = `${environment.AVATAR_GENERATOR_URL}?seed=${encodeURI(user.name)}`;

		const response = (await UserModel.create(user)).toObject();

		return response;
	},

	async updateUser(id: string, data: Partial<Omit<IUser, 'password'>>) {
		const user = await UserModel.findById(id).lean();
		if (!user) throw new Error('User not found');

		data.avatar = `${environment.AVATAR_GENERATOR_URL}?seed=${encodeURI(user.name)}`;

		const response = await UserModel.findByIdAndUpdate(id, data, { new: true }).lean();

		return response;
	},

	async updateUserPassword(id: string, password: string) {
		const response = await UserModel.findByIdAndUpdate(
			id,
			{ password },
			{ new: true }
		).lean();

		return response;
	},

	async changeUserActive(id: string) {
		const response = await UserModel.findById(id);
		if (!response) return null;

		await response.changeActive();

		return response.toObject();
	},

	async deleteUser(id: string) {
		const response = await UserModel.findByIdAndDelete(id).lean();

		return response;
	},
};
