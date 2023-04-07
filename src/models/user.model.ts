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
		password: {
			type: String,
			required: true,
			select: false,
		},
		billingAddress: {
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
		deliveryAddress: {
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
	},
	{ timestamps: true }
);

export const UserModel = model('User', UserSchema);
