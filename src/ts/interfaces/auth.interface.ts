import { IUser } from './user.interface';

export interface IAuth {
	email: IUser['email'];
	password: IUser['password'];
}
