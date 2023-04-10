export type TEnvironment = {
	ENV: 'development' | 'production' | 'test' | string;
	PORT: number;
	DATABASE_URL: string;
};
