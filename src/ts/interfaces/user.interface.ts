import { Document, Model, PaginateModel } from 'mongoose';

// TS
import { IAddress, TDocument } from '@ts';

export interface IUser extends TDocument {
	name: string;
	email: string;
	avatar?: string;
	password: string;
	dateOfBirth?: Date;
	billingAddress?: IAddress;
	deliveryAddress?: IAddress;
	active?: boolean;
	role: 'user' | 'admin';
}

export interface IUserDocument extends IUser, Document<string> {}
export interface IUserModel extends Model<IUserDocument> {}
export interface IUserMethods extends IUserDocument {
	generatePasswordHash(password: string): Promise<string>;
	generateAvatar(seed: string): string;
	comparePassword(password: string): Promise<boolean>;
	changeActive(): Promise<IUser>;
}
export interface IUserPaginateModel
	extends PaginateModel<IUserDocument, {}, IUserMethods> {}
