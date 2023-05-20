import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

export const objectIdGeneric = z.custom<string>(isValidObjectId);
