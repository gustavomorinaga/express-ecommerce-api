import { Document, Model, model, PaginateModel, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

// Config
import { environment, paginatePlugin } from '@config';

// Models
import { AddressSchema } from '@models';

// TS
import { IUser } from '@ts';

interface IUserDocument extends IUser, Document<string> {}
interface IUserModel extends Model<IUserDocument> {}
interface IUserMethods extends IUserDocument {
	comparePassword(password: string): Promise<boolean>;
	changeActive(): Promise<IUser>;
}
interface IUserPaginateModel extends PaginateModel<IUserDocument, {}, IUserMethods> {}

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

UserSchema.pre('save', function (next) {
	const user = this;

	user.avatar ??= `${environment.AVATAR_GENERATOR_URL}?seed=${encodeURI(user.name)}`;

	if (!user.isModified('password') || !user.isNew) return next();

	bcrypt.genSalt(environment.BCRYPT_SALT, function (error, salt) {
		if (error) return next(error);

		bcrypt.hash(user.password, salt, function (hashError, hash) {
			if (hashError) return next(hashError);

			user.password = hash;
			next();
		});
	});
});

UserSchema.methods.comparePassword = function (password) {
	return bcrypt.compare(password, this.password);
};
UserSchema.methods.changeActive = function () {
	this.active = !this.active;

	return this.save();
};

export const UserModel = model<IUserDocument, IUserPaginateModel>('User', UserSchema);
