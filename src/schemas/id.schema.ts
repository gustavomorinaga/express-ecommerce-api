import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const objectId = z.custom<string>(isValidObjectId);
