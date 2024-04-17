import { z } from 'zod'
// ================================================================
const uuid = z.string().uuid()
// ================================================================

// ================================================================
export const answerSchemas = z.object({
    uuid: z.string().uuid(),
    isChecked: z.boolean()
}).array()

export type answerType = z.infer<typeof answerSchemas>

export const answerTestSchemas = z.object({
    uuid,
    answer: answerSchemas
})
// ================================================================

// ================================================================
export type answerTestType = z.infer<typeof answerTestSchemas>
// ================================================================

// ================================================================
export const setAnswerHandlerSchemas = z.function().args(answerTestSchemas).returns(z.void())
export type setAnswerHandlerType = z.infer<typeof setAnswerHandlerSchemas>
// ================================================================


