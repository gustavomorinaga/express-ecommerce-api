import mongoosePaginate from 'mongoose-paginate-v2';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

export const paginateConfig: typeof mongoosePaginate.paginate.options = {
	lean: true,
	leanWithId: false,
	limit: 20,
	customLabels: {
		docs: 'data',
		totalDocs: 'total',
		meta: 'metadata',
	},
};

mongoosePaginate.paginate.options = paginateConfig;

export const paginatePlugin = mongoosePaginate;
export const aggregatePaginatePlugin = aggregatePaginate;
