import { z } from 'zod';

// Schemas
import { loginAuthSchema, resetAuthSchema } from '@schemas';

export type TAuthLogin = z.infer<typeof loginAuthSchema>['body'];

export type TAuthReset = z.infer<typeof resetAuthSchema>['body'];
