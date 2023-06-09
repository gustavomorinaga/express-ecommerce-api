import { z } from 'zod';

// Schemas
import { getUsersSchema } from '@schemas';

export type TUserQuery = z.infer<typeof getUsersSchema>['query'];
