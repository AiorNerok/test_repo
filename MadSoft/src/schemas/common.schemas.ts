import { z } from 'zod'

// =====================================================================================================
export enum checkEnum {
    "CHECKBOX",
    "RADIO"
}
export const checkEnumSchemas = z.nativeEnum(checkEnum);
export type checkEnumType = z.infer<typeof checkEnumSchemas>;
// =====================================================================================================
export const chooseOptionSchemas = z.function().args(z.string().uuid().array().min(1)).returns(z.void())
export type chooseOptionType = z.infer<typeof chooseOptionSchemas>
// =====================================================================================================
export enum StageEnum {
    "PREPARATION",
    "TESTING",
    "RESULT",
}
export const stageTestingSchemas = z.nativeEnum(StageEnum)
export type stageTestingType = z.infer<typeof stageTestingSchemas>;
// =====================================================================================================
export const EmptyFunctionSchemas = z.function().returns(z.void())
export type EmptyFunctionType = z.infer<typeof EmptyFunctionSchemas>
// =====================================================================================================
export const TimeDurationSchemas = z.number().positive()
export type TimeDurationType = z.infer<typeof TimeDurationSchemas>
// =====================================================================================================
export const SetTimeDurationSchemas = z.function().args(TimeDurationSchemas).returns(z.void())
export type SetTimeDurationType = z.infer<typeof SetTimeDurationSchemas>
// =====================================================================================================



export const QuestionUuidSchemas = z.string().uuid()
export const QuestionTextSchemas = z.string().min(2)
export const QuestionOptionIsTrueSchemas = z.boolean()

export const OptionBaseSchemas = z.object({
    uuid: QuestionUuidSchemas,
    text: QuestionTextSchemas,
    isTrue: QuestionOptionIsTrueSchemas
})

export const QuestionSchemas = z.object({
    uuid: QuestionUuidSchemas,
    text: QuestionTextSchemas,
    options: OptionBaseSchemas.array()
})


export function GenerateBaseSchemas<T extends z.ZodTypeAny>(itemSchema: T) {
    return z.object({
        uuid: QuestionUuidSchemas,
        text: QuestionTextSchemas,
        option: itemSchema.array()
    })
}
