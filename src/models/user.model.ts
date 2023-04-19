import { model, Schema } from 'mongoose';

// TS
import { IUser } from '@ts';

const UserSchema = new Schema<IUser>(
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
			type: {
				street: {
					type: String,
					required: true,
				},
				number: {
					type: Number,
					required: true,
				},
				complement: {
					type: String,
				},
				neighborhood: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				state: {
					type: String,
					required: true,
				},
				country: {
					type: String,
					required: true,
				},
				zipCode: {
					type: String,
					required: true,
				},
			},
			required: false,
		},
		deliveryAddress: {
			type: {
				street: {
					type: String,
					required: true,
				},
				number: {
					type: Number,
					required: true,
				},
				complement: {
					type: String,
				},
				neighborhood: {
					type: String,
					required: true,
				},
				city: {
					type: String,
					required: true,
				},
				state: {
					type: String,
					required: true,
				},
				country: {
					type: String,
					required: true,
				},
				zipCode: {
					type: String,
					required: true,
				},
			},
			required: false,
		},
	},
	{ timestamps: true }
);

export const UserModel = model('User', UserSchema);
