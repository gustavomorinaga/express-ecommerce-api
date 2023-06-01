import { Document, Model, PaginateModel } from 'mongoose';

// TS
import { IAddress, IUser, IProduct, TDocument, IProductVariant } from '@ts';

export interface IOrder extends TDocument {
	orderID: string;
	user: TDocument['_id'];
	deliveryAddress: IAddress;
	totalPrice: number;
	status: 'pending' | 'canceled' | 'delivered' | 'completed';
	observation?: string;
	products: {
		product: TDocument['_id'];
		variant: TDocument['_id'];
		quantity: number;
	}[];
}

export interface IOrderPopulated extends Omit<IOrder, 'user' | 'products'> {
	user: IUser;
	products: {
		product: IProduct;
		variant: IProductVariant;
		quantity: number;
	}[];
}

export interface IOrderDocument extends IOrder, Document<string> {}
export interface IOrderModel extends Model<IOrderDocument> {}
export interface IOrderMethods extends IOrderDocument {}
export interface IOrderPaginateModel
	extends PaginateModel<IOrderPopulated, {}, IOrderMethods> {}
