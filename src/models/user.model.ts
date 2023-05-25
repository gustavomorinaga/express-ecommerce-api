import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Config
import { paginatePlugin } from '@config';

// Models
import { AddressSchema } from '@models';

// Hooks
import { preSaveUserHook } from '@hooks';

// TS
import { IUser, IUserDocument, IUserMethods, IUserModel, IUserPaginateModel } from '@ts';

const UserSchema = new Schema<IUser, IUserModel, IUserMethods>(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		avatar: {
			type: String,
			required: false,
		},
		password: {
			type: String,
			required: true,
			select: false,
		},
		billingAddress: {
			type: AddressSchema.obj,
			required: false,
		},
		deliveryAddress: {
			type: AddressSchema.obj,
			required: false,
		},
		active: {
			type: Boolean,
			required: false,
			default: true,
		},
	},
	{
		timestamps: true,
	}
);

UserSchema.plugin(paginatePlugin);

UserSchema.pre('save', preSaveUserHook);

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};
UserSchema.methods.changeActive = function () {
	this.active = !this.active;

	return this.save();
};

export const UserModel = model<IUserDocument, IUserPaginateModel>('User', UserSchema);
