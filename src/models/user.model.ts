import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Config
import { environment, paginatePlugin } from '@config';

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
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			trim: true,
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
		collation: { locale: 'en' },
	}
);

UserSchema.plugin(paginatePlugin);

UserSchema.pre('save', preSaveUserHook);

UserSchema.index({ name: 'text', email: 'text' });

UserSchema.methods.generatePasswordHash = function (password) {
	return new Promise((resolve, reject) => {
		bcrypt.genSalt(environment.BCRYPT_SALT, function (error, salt) {
			if (error) return reject(error);

			bcrypt.hash(password, salt, function (hashError, hash) {
				if (hashError) return reject(hashError);

				resolve(hash);
			});
		});
	});
};
UserSchema.methods.generateAvatar = function (seed) {
	return `${environment.AVATAR_GENERATOR_URL}?seed=${encodeURI(seed)}`;
};
UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};
UserSchema.methods.changeActive = function () {
	this.active = !this.active;

	return this.save();
};

export const UserModel = model<IUserDocument, IUserPaginateModel>('User', UserSchema);
