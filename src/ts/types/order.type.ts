import { z } from 'zod';

// Schemas
import { createOrderSchema, getOrdersSchema, updateOrderSchema } from '@schemas';

// TS
import { IOrder } from '@ts';

export type TOrderQuery = z.infer<typeof getOrdersSchema>['query'];

export type TOrderCreate = z.infer<typeof createOrderSchema>['body'] & {
	products: IOrder['products'];
};

export type TOrderUpdate = z.infer<typeof updateOrderSchema>['body'];
