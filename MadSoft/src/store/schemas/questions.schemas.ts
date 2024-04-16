import { z } from 'zod'

// ---------------------------------------------------------------------------------------------------------
export const uuidSchemas = z.string().uuid()
export const questionSchemas = z.string().trim().min(1);
export const optionsSchemas = z.object({ uuid: uuidSchemas, text: z.string(), isCurrentAnswer: z.boolean().default(false) }).array().min(2);
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
export type UuidType = z.infer<typeof uuidSchemas>
export type QuestionType = z.infer<typeof questionSchemas>
export type OptionsType = z.infer<typeof optionsSchemas>
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
export const ItemQuestionSchemas = z.object({ uuid: uuidSchemas, question: questionSchemas, options: optionsSchemas })
export type ItemQuestionType = z.infer<typeof ItemQuestionSchemas>
// ---------------------------------------------------------------------------------------------------------


// ---------------------------------------------------------------------------------------------------------
export const addQuestion = z.function().args(ItemQuestionSchemas).returns(z.void())
export const removeQuestion = z.function().args(uuidSchemas).returns(z.void())
export const dropQuestion = z.function().args().returns(z.void())

export type addQuestionType = z.infer<typeof addQuestion>
export type removeQuestionType = z.infer<typeof removeQuestion>
export type dropQuestionType = z.infer<typeof dropQuestion>
// ---------------------------------------------------------------------------------------------------------
