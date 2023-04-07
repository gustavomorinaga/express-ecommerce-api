// Schemas
import { UserModel } from '../models';

// TS
import { IUser } from '../ts';

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
			const response = (await UserModel.create(user)).toObject();

			return response;
		} catch (error) {
			console.error(error);
		}
	},

	async updateUser(id: string, user: IUser) {
		try {
			const response = await UserModel.findByIdAndUpdate(id, user, { new: true }).lean();

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
