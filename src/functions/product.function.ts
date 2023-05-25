// Utils
import { slugify } from '@utils';

// TS
import { IProduct, IProductDocument } from '@ts';

export const getProductStatus = (product: IProduct | IProductDocument) =>
	product.stock > 5 ? 'in-stock' : product.stock > 0 ? 'low-stock' : 'out-of-stock';

export const getProductSlug = (product: IProduct | IProductDocument) =>
	slugify(product.name);
