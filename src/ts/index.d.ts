import { IUser } from './index';

declare global {
	namespace Express {
		interface Request {
			_user: IUser;
		}
	}
}
