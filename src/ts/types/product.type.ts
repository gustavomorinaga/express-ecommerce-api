export type TQueryProduct = {
	name?: string;
	startPrice?: number;
	endPrice?: number;
	hasEmptyStock?: boolean;
	sortBy: 'name' | 'price' | 'stock' | 'status' | 'createdAt' | 'updatedAt';
	orderBy: 1 | -1;
};
