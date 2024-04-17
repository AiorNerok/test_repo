import { z } from 'zod'
// ================================================================
const uuid = z.string().uuid()
// ================================================================

// ================================================================
export const answerSchemas = z.object({
    uuid,
    answer: uuid.array().min(1)
})
// ================================================================

// ================================================================
export type answerType = z.infer<typeof answerSchemas>
// ================================================================

// ================================================================
export const setAnswerHandlerSchemas = z.function().args(answerSchemas).returns(z.void())
export type setAnswerHandlerType = z.infer<typeof setAnswerHandlerSchemas>
// ================================================================


