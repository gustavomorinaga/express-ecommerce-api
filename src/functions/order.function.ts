// TS
import { IOrderPopulated } from '@ts';

export const getOrderTotalPrice = (order: IOrderPopulated) =>
	order.products.reduce(
		(acc, { variant: { price }, quantity }) => acc + price * quantity,
		0
	);
