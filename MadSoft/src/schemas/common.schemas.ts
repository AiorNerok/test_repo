import { z } from 'zod'

export const checkEnumSchemas = z.enum(["checkbox", "radio"]);
export type checkEnumType = z.infer<typeof checkEnumSchemas>;

export const chooseOptionSchemas = z.function().args(z.string().uuid().array().min(1)).returns(z.void())
export type chooseOptionType = z.infer<typeof chooseOptionSchemas>