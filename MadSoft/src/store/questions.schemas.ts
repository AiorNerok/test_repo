import { z } from 'zod'

// ############################################################################
const uuid = z.string().uuid();
// ############################################################################

// ############################################################################
export const OptionSchemas = z.object({
    uuid: uuid.array(),
    text: z.string().array(),
})
export type OptionType = z.infer<typeof OptionSchemas>
// ############################################################################


// ############################################################################
export const singleChooseSchemas = z.object({
    OptionSchemas, answer: uuid
}).refine(({ OptionSchemas, answer }) => OptionSchemas.uuid.includes(answer), {
    message: "ошибка uuid"
})

export const multiChooseSchemas = z.object({
    OptionSchemas, answer: uuid.array()
}).refine(({ OptionSchemas, answer }) => {
    let intersections = OptionSchemas.uuid.filter(x => answer.includes(x))
    return intersections.length == answer.length
}, {
    message: "ошибка uuid, не корректные значения"
})

export const QuestionSchemas = z.object({
    uuid: z.string().uuid(),
    title: z.string().trim().min(1),
    options: z.union([singleChooseSchemas, multiChooseSchemas])
})
export type QuestionType = z.infer<typeof QuestionSchemas>
// ############################################################################

// ############################################################################
const AddNewQuestion = z.function().args(QuestionSchemas).returns(z.void())
export type AddNewQuestionType = z.infer<typeof AddNewQuestion>
// ############################################################################

// ############################################################################
const RemoveQuestion = z.function().args(uuid).returns(z.void())
export type RemoveQuestionType = z.infer<typeof RemoveQuestion>
// ############################################################################

// ############################################################################
const DropQuestion = z.function().args().returns(z.void())
export type DropQuestionType = z.infer<typeof DropQuestion>
// ############################################################################

