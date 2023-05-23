import { Document, Model, Schema } from 'mongoose';

// TS
import { IAddress } from '@ts';

interface IAddressDocument extends IAddress, Document {}
interface IAddressModel extends Model<IAddressDocument> {}
interface IAddressMethods extends IAddressDocument {}

export const AddressSchema = new Schema<IAddress, IAddressModel, IAddressMethods>({
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
