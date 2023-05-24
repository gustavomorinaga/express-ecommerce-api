export const slugify = (value: string): string =>
	value
		.normalize('NFD')
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^\w-]+/g, '');
