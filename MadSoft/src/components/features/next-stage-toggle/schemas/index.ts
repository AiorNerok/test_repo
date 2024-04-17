import { z } from 'zod'

export const actionSchemas = z.function().args().returns(z.void())
export type actionType = z.infer<typeof actionSchemas>