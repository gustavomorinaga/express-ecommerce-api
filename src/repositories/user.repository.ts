// Schemas
import { UserModel } from '@models';

// TS
import { IUser } from '@ts';

// Errors
import { handleError } from '@errors';

export const UserRepository = {
	async getUsers() {
		return await UserModel.paginate();
	},

	async getUser(_id: IUser['_id']) {
		const user = await UserModel.findById(_id).lean();
		if (!user) return handleError('User not found', 'NOT_FOUND');

		return user;
	},

	async getUserByEmail(email: IUser['email']) {
		const user = await UserModel.findOne({ email }).lean();
		if (!user) return handleError('User not found', 'NOT_FOUND');

		return user;
	},

	async createUser(user: IUser) {
		const userExists = await UserModel.findOne({ email: user.email }).lean();
		if (userExists) return handleError('User already exists', 'BAD_REQUEST');

		return (await UserModel.create(user)).toObject();
	},

	async updateUser(_id: IUser['_id'], data: Partial<Omit<IUser, 'password'>>) {
		const user = await UserModel.findById(_id).lean();
		if (!user) return handleError('User not found', 'NOT_FOUND');

		return await UserModel.findByIdAndUpdate(_id, data, { new: true }).lean();
	},

	async updateUserPassword(_id: IUser['_id'], password: string) {
		return await UserModel.findByIdAndUpdate(_id, { password }, { new: true }).lean();
	},

	async changeUserActive(_id: IUser['_id']) {
		const user = await UserModel.findById(_id);
		if (!user) return handleError('User not found', 'NOT_FOUND');

		await user.changeActive();

		return user.toObject();
	},

	async deleteUser(_id: IUser['_id']) {
		return await UserModel.findByIdAndDelete(_id).lean();
	},
};
