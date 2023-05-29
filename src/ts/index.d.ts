import { IUser } from '@ts';

declare global {
	namespace Express {
		interface Request {
			_user: IUser;
		}
	}

	type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
}
