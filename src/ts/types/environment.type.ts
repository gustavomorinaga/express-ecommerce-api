export type TEnvironment = {
	ENV: 'development' | 'production' | 'test' | string;
	PORT: number;
	APP_URL?: string;
	DATABASE_URL?: string;
	JWT_SECRET?: string;
	BCRYPT_SALT: number;

	EMAIL_HOST?: string;
	EMAIL_PORT?: number;
	EMAIL_USER?: string;
	EMAIL_PASS?: string;
	EMAIL_FROM?: string;

	AVATAR_GENERATOR_URL?: string;
};
