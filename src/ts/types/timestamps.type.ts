import type { SchemaTimestampsConfig } from 'mongoose';

export type TTimestamps = Omit<SchemaTimestampsConfig, 'currentTime'>;
