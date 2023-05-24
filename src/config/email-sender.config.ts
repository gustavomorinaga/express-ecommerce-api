import nodemailer from 'nodemailer';

// Config
import { environment } from '@config';

export const transporter = nodemailer.createTransport({
	service: environment.EMAIL_SERVICE,
	host: environment.EMAIL_HOST,
	port: environment.EMAIL_PORT,
	secure: true,
	auth: {
		user: environment.EMAIL_USER,
		pass: environment.EMAIL_PASS,
	},
});
