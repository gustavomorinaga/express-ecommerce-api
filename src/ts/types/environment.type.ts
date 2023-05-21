export type TEnvironment = {
	ENV: 'development' | 'production' | 'test' | string;
	PORT: number;
	APP_URL?: string;
	JWT_SECRET?: string;
	BCRYPT_SALT: number;

	DATABASE_USER: string;
	DATABASE_PASS: string;
	DATABASE_HOST: string;
	DATABASE_NAME: string;

	EMAIL_HOST?: string;
	EMAIL_PORT?: number;
	EMAIL_USER?: string;
	EMAIL_PASS?: string;
	EMAIL_FROM?: string;

	AVATAR_GENERATOR_URL?: string;
};
