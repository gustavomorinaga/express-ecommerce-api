import { IAddress, TDocument } from '@ts';

export interface IUser extends TDocument {
	name: string;
	email: string;
	avatar?: string;
	password: string;
	billingAddress?: IAddress;
	deliveryAddress?: IAddress;
	active?: boolean;
}
