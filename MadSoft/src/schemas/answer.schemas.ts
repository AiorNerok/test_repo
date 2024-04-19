import { z } from 'zod'
import { GenerateBaseSchemas, OptionBaseSchemas } from './common.schemas'
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