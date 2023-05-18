import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const ObjectId = z.custom<string>(isValidObjectId);
