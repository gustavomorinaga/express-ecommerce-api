import type { CallbackWithoutResultAndOptionalError } from 'mongoose';

// Functions
import { getProductStatus } from '@functions';

// TS
import { IProductVariantDocument } from '@ts';

export const preSaveProductVariantHook = async function (
	this: IProductVariantDocument,
	next: CallbackWithoutResultAndOptionalError
) {
	let variant = this;

	Object.assign(variant, {
		status: getProductStatus(variant.stock),
	});

	return next();
};
