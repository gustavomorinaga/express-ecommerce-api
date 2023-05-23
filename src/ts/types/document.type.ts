import type { Document, SchemaTimestampsConfig } from 'mongoose';

export type TDocument = Pick<Document, '_id'> &
	Omit<SchemaTimestampsConfig, 'currentTime'>;
