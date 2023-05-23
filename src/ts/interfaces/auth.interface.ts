import { IUser } from '@ts';

export interface IAuth {
	email: IUser['email'];
	password: IUser['password'];
}
