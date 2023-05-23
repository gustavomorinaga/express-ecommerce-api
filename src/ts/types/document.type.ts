import type { Document, SchemaTimestampsConfig } from 'mongoose';

export type TDocument = Pick<Document<string>, '_id'> &
	Omit<SchemaTimestampsConfig, 'currentTime'>;
