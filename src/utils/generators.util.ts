import crypto from 'node:crypto';

export const generateNumberUUID = () => {
	const buf = crypto.randomBytes(16);
	const bytes = Array.from(buf);

	const hexString = bytes.map(byte => byte.toString(16).padStart(2, '0')).join('');
	const decimalString = BigInt(`0x${hexString}`).toString();

	const segments = [
		decimalString.substring(0, 5),
		decimalString.substring(10, 5),
		decimalString.substring(15, 10),
	];

	return segments.join('-');
};
