import { Schema } from 'mongoose';

// TS
import { IAddress, IAddressMethods, IAddressModel } from '@ts';

export const AddressSchema = new Schema<IAddress, IAddressModel, IAddressMethods>({
	street: {
		type: String,
		required: true,
		trim: true,
	},
	number: {
		type: Number,
		required: true,
	},
	complement: {
		type: String,
		required: false,
		trim: true,
	},
	neighborhood: {
		type: String,
		required: true,
		trim: true,
	},
	city: {
		type: String,
		required: true,
		trim: true,
	},
	state: {
		type: String,
		required: true,
		trim: true,
	},
	country: {
		type: String,
		required: true,
		trim: true,
	},
	zipCode: {
		type: String,
		required: true,
		trim: true,
	},
});
