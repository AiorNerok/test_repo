import { z } from 'zod'

// ---------------------------------------------------------------------------------------------------------
export const isCurrentAnswerSchemas = z.boolean()
export const TextSchemas = z.string().trim().min(2)
// ---------------------------------------------------------------------------------------------------------
export const uuidSchemas = z.string().uuid()
export const questionSchemas = z.string().trim().min(1);
export const optionsSchemas = z.object({
    uuid: uuidSchemas,
    text: TextSchemas,
    isCurrentAnswer: isCurrentAnswerSchemas,
    error: z.boolean()
}).array().min(2)
    .refine(d => d.some(el => el.isCurrentAnswer))
    .refine(d => d.every(el => !el.error))
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
export type UuidType = z.infer<typeof uuidSchemas>
export type QuestionType = z.infer<typeof questionSchemas>
export type OptionsType = z.infer<typeof optionsSchemas>
// ---------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------
export const ItemQuestionSchemas = z.object({
    uuid: uuidSchemas,
    question: questionSchemas,
    options: optionsSchemas
})
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


// =========================================================================================================
import { OptionBaseSchemas, GenerateBaseSchemas } from './common.schemas';

const OptionWithErrorState = OptionBaseSchemas.merge(z.object({
    error: z.boolean()
}))

export const ForCreateQuestionSchemas = GenerateBaseSchemas(OptionWithErrorState)
export const CreateNewQuestionSchemas = GenerateBaseSchemas(OptionBaseSchemas)
export const QuestionItemSchemas = GenerateBaseSchemas(OptionBaseSchemas)


export type QuestionItemType = z.infer<typeof QuestionItemSchemas>
export type ForCreateQuestionType = z.infer<typeof ForCreateQuestionSchemas>
export type CreateNewQuestionType = z.infer<typeof CreateNewQuestionSchemas>

export const QuestionListSchemas = QuestionItemSchemas.array()
export const QuestionListItemSchemas = QuestionItemSchemas
export type QuestionListType = z.infer<typeof QuestionListItemSchemas>

export const AppendNewQuestionStoreSchemas = z.function().args(QuestionListItemSchemas).returns(z.void())
export type AppendNewQuestionStoreType = z.infer<typeof AppendNewQuestionStoreSchemas>