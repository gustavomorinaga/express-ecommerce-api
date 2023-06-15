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

		const populateDictionary: Record<string, PipelineStage[]> = {
			users: [
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
					$match: { 'user.active': true },
				},
			],
			products: [
				{
					$unwind: '$products',
				},
				{
					$lookup: {
						from: 'products',
						localField: 'products.product',
						foreignField: '_id',
						as: 'products.product',
					},
				},
				{
					$unwind: '$products.product',
				},
				{
					$unset: ['products.product.variants'],
				},
			],
			brand: [
				{
					$lookup: {
						from: 'brands',
						localField: 'products.product.brand',
						foreignField: '_id',
						as: 'products.product.brand',
					},
				},
				{
					$unwind: '$products.product.brand',
				},
			],
			category: [
				{
					$lookup: {
						from: 'categories',
						localField: 'products.product.category',
						foreignField: '_id',
						as: 'products.product.category',
					},
				},
				{
					$unwind: {
						path: '$products.product.category',
						preserveNullAndEmptyArrays: true,
					},
				},
				{ $unset: ['products.product.category.subCategories'] },
			],
			subCategory: [
				{
					$lookup: {
						from: 'subcategories',
						localField: 'products.product.subCategory',
						foreignField: '_id',
						as: 'products.product.subCategory',
					},
				},
				{
					$unwind: {
						path: '$products.product.subCategory',
						preserveNullAndEmptyArrays: true,
					},
				},
			],
			variants: [
				{
					$lookup: {
						from: 'productvariants',
						localField: 'products.variant',
						foreignField: '_id',
						as: 'products.variant',
					},
				},
				{
					$unwind: '$products.variant',
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
						products: { $push: '$products' },
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
				},
			],
		};

		const sortByDictionary = {
			user: { 'user.name': query.orderBy },
			totalPrice: { totalPrice: query.orderBy },
			status: { status: query.orderBy },
			createdAt: { createdAt: query.orderBy },
			updatedAt: { updatedAt: query.orderBy },
		} as const;

		if (query.orderID)
			conditions.unshift({ $match: { $text: { $search: query.orderID } } });

		if (query.userID)
			conditions.push({ $match: { user: new Types.ObjectId(query.userID) } });

		if (query.status) conditions.push({ $match: { status: query.status } });

		if (query.startDate || query.endDate)
			conditions.push({
				$match: {
					createdAt: {
						...(query.startDate && { $gte: new Date(query.startDate) }),
						...(query.endDate && { $lte: new Date(query.endDate) }),
					},
				},
			});

		const populateStages = Object.values(populateDictionary).flat();

		conditions.push(...populateStages);

		const aggregation = OrderModel.aggregate<IOrderPopulated>(conditions);

		return await OrderModel.aggregatePaginate(aggregation, {
			...paginateConfig,
			page: query.page,
			limit: query.limit,
			sort: sortByDictionary[query.sortBy],
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
