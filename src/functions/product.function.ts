// Utils
import { slugify } from '@utils';

// TS
import { IProduct, IProductVariant } from '@ts';

export const getProductStatus = (stock: IProductVariant['stock']) =>
	stock > 5 ? 'in-stock' : stock > 0 ? 'low-stock' : 'out-of-stock';

export const getProductSlug = (name: IProduct['name']) => slugify(name);
