import { IAddress, TTimestamps } from '@ts';

export interface IUser extends TTimestamps {
	name: string;
	email: string;
	password: string;
	billingAddress: IAddress;
	deliveryAddress: IAddress;
}
