import { Schema } from 'mongoose';

// TS
import { IAddress } from '@ts';

export const AddressSchema = new Schema<IAddress>({
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
});
