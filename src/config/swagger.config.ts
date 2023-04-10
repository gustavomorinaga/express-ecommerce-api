import swaggerJSDoc, { type Options } from 'swagger-jsdoc';

const options: Options = {
	definition: {
		openapi: '3.0.1',
		info: {
			title: 'REST API for Express E-commerce API',
			version: process.version,
		},
		schemes: ['http', 'https'],
		servers: [{ url: 'http://localhost:3000/' }],
	},
	apis: ['./src/routes.ts', './dist/index.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
