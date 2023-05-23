import { IUser } from '@ts';

declare global {
	namespace Express {
		interface Request {
			_user: IUser;
		}
	}
}
