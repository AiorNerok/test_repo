import { z } from 'zod'
// ================================================================
const uuid = z.string().uuid()
// ================================================================

// ================================================================
export const answerSchemas = z.object({
    uuid: z.string().uuid(),
    text: z.string().trim().min(2),
    isCurrentAnswer: z.boolean(),
    isChecked: z.boolean()
}).array()

export type answerType = z.infer<typeof answerSchemas>

export const answerTestSchemas = z.object({
    uuid,
    question: z.string(),
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


