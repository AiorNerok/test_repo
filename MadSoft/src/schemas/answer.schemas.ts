import { z } from 'zod'
import { GenerateBaseSchemas, OptionBaseSchemas } from './common.schemas'
// ================================================================
// const AnswerBaseSchemas = z.object({
//     uuid: z.string().uuid(),
//     text: z.string().trim().min(2),
//     isCurrentAnswer: z.boolean(),
// })

// const AnswerWithCheckedSchemas = AnswerBaseSchemas.merge(z.object({ isChecked: z.boolean() }))
// const AnswerResultSchemas = AnswerWithCheckedSchemas.merge(z.object({ isСorrectly: z.boolean() }))



// // ================================================================
// export type AnswerWithCheckedType = z.infer<typeof AnswerWithCheckedSchemas>
// export type AnswerResultType = z.infer<typeof AnswerResultSchemas>

// export const answerTestSchemas = z.object({
//     uuid,
//     question: z.string(),
//     // answer: answerSchemas
// })
// // ================================================================

// // ================================================================
// export type answerTestType = z.infer<typeof answerTestSchemas>
// // ================================================================

// // ================================================================
// export const setAnswerHandlerSchemas = z.function().args(answerTestSchemas).returns(z.void())
// export type setAnswerHandlerType = z.infer<typeof setAnswerHandlerSchemas>
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================
// ================================================================

export const AnswerOptionBaseSchemas = OptionBaseSchemas.merge(z.object({ isSelected: z.boolean() }))
export type AnswerOptionBaseType = z.infer<typeof AnswerOptionBaseSchemas>

export type AnswerOptionBaseToRenderType = z.infer<typeof AnswerOptionBaseSchemas>
export const AnswerOptionToRenderSchemas = GenerateBaseSchemas(AnswerOptionBaseSchemas).merge(z.object({ isSuccess: z.boolean() }))
export type AnswerOptionToRenderType = z.infer<typeof AnswerOptionToRenderSchemas>


export const AnswerItemBaseSchemas = GenerateBaseSchemas(AnswerOptionBaseSchemas)
export type AnswerItemBaseType = z.infer<typeof AnswerItemBaseSchemas>

export const AddAnswerSchemas = z.function().args(AnswerItemBaseSchemas).returns(z.void())
export type AddAnswer = z.infer<typeof AddAnswerSchemas>


// 

