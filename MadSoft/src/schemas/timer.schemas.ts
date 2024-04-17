import { z } from 'zod'

export const TimerSchemas = z.number().min(1).positive().refine(v => v > 0, {
    message: "Не корректное значение"
})

const SetTimerSchemas = z.function().args(z.number()).returns(z.void())

export type TimerTypes = z.infer<typeof TimerSchemas>
export type SetTimerTypes = z.infer<typeof SetTimerSchemas>

