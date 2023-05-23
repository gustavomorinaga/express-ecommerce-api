import nodemailer from 'nodemailer';

// Configs
import { environment } from '@config';

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: environment.EMAIL_HOST,
	port: environment.EMAIL_PORT,
	secure: true,
	auth: {
		user: environment.EMAIL_USER,
		pass: environment.EMAIL_PASS,
	},
});
