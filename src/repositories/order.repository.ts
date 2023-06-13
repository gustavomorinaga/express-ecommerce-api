import { PipelineStage, Types } from 'mongoose';

// Config
import { paginateConfig } from '@config';

// Schemas
import { OrderModel } from '@models';

// TS
import { IOrder, IOrderPopulated, TOrderCreate, TOrderQuery, TOrderUpdate } from '@ts';

export const OrderRepository = {
	async getOrders(query: TOrderQuery) {
		const conditions: PipelineStage[] = [];

		if (query.orderID)
			conditions.unshift({ $match: { $text: { $search: query.orderID } } });
		if (query.userID)
			conditions.push({ $match: { user: new Types.ObjectId(query.userID) } });
		if (query.status) conditions.push({ $match: { status: query.status } });

		conditions.push(
			{
				$lookup: {
					from: 'users',
					localField: 'user',
					foreignField: '_id',
					as: 'user',
				},
			},
			{
				$unwind: '$user',
			},
			{
				$unset: ['user.password'],
			},
			{
				$unwind: '$products',
			},
			{
				$lookup: {
					from: 'products',
					localField: 'products.product',
					foreignField: '_id',
					as: 'product',
				},
			},
			{
				$unwind: '$product',
			},
			{
				$unset: ['product.variants'],
			},
			{
				$lookup: {
					from: 'productvariants',
					localField: 'products.variant',
					foreignField: '_id',
					as: 'variant',
				},
			},
			{
				$unwind: '$variant',
			},
			{
				$group: {
					_id: {
						_id: '$_id',
						orderID: '$orderID',
					},
					user: { $first: '$user' },
					deliveryAddress: { $first: '$deliveryAddress' },
					totalPrice: { $first: '$totalPrice' },
					status: { $first: '$status' },
					observation: { $first: '$observation' },
					products: {
						$push: {
							product: '$product',
							variant: '$variant',
							quantity: '$products.quantity',
						},
					},
					createdAt: { $first: '$createdAt' },
					updatedAt: { $first: '$updatedAt' },
				},
			},
			{
				$project: {
					_id: '$_id._id',
					orderID: '$_id.orderID',
					user: '$user',
					deliveryAddress: '$deliveryAddress',
					totalPrice: '$totalPrice',
					status: '$status',
					observation: '$observation',
					products: '$products',
					createdAt: '$createdAt',
					updatedAt: '$updatedAt',
				},
			}
		);

		const aggregation = OrderModel.aggregate<IOrderPopulated>(conditions);

		return await OrderModel.aggregatePaginate(aggregation, {
			...paginateConfig,
			page: query.page,
			limit: query.limit,
			sort: { [query.sortBy]: query.orderBy },
			collation: { locale: 'en' },
		});
	},

	async getOrder(id: IOrder['_id']) {
		return await OrderModel.findById(id)
			.populate('user products.variant')
			.populate({
				path: 'products.product',
				select: '-variants',
				populate: { path: 'brand' },
			})
			.lean<IOrderPopulated>();
	},

	async createOrder(order: TOrderCreate) {
		const createdOrder = await OrderModel.create(order)
			.then(doc => doc.populate('user products.variant'))
			.then(doc =>
				doc.populate({
					path: 'products.product',
					select: '-variants',
					populate: { path: 'brand' },
				})
			);

		return createdOrder.toObject<IOrderPopulated>();
	},

	async updateOrder(id: IOrder['_id'], product: TOrderUpdate) {
		return await OrderModel.findByIdAndUpdate(id, product, { new: true })
			.populate('user products.variant')
			.populate({
				path: 'products.product',
				select: '-variants',
				populate: { path: 'brand' },
			})
			.lean<IOrderPopulated>();
	},

	async setStatusOrder(id: IOrder['_id'], status: IOrder['status']) {
		return await OrderModel.findByIdAndUpdate(id, { status }, { new: true })
			.populate('user products.variant')
			.populate({
				path: 'products.product',
				select: '-variants',
				populate: { path: 'brand' },
			})
			.lean<IOrderPopulated>();
	},
};
