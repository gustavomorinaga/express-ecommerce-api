import { z } from 'zod';

// Schemas
import { createUserSchema, getUsersSchema, updateUserSchema } from '@schemas';

export type TUserQuery = z.infer<typeof getUsersSchema>['query'];

export type TUserCreate = z.infer<typeof createUserSchema>['body'];

export type TUserUpdate = z.infer<typeof updateUserSchema>['body'];
