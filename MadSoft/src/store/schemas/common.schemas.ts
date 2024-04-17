import { z } from 'zod'

export const typeCheckEnum = z.enum(["checkbox", "radio"]);
export type typeCheckEnum = z.infer<typeof typeCheckEnum>;