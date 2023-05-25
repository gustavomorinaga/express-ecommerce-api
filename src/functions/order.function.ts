// TS
import { IOrderPopulated } from '@ts';

export const getOrderTotalPrice = (order: IOrderPopulated) =>
	order.products.reduce(
		(acc, { product: { price }, quantity }) => acc + price * quantity,
		0
	);
