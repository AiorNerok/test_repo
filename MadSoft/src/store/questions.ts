import { z } from 'zod'
import { create } from 'zustand'

import type {
    ItemQuestionType,
    addQuestionType,
    removeQuestionType,
    dropQuestionType
} from './schemas/questions.schemas'
import {
    ItemQuestionSchemas
} from './schemas/questions.schemas'

import {
    TimerSchemas,
    type TimerTypes,
    type SetTimerTypes
} from './schemas/timer.schemas'

type QuestionnaireStoreProps = {
    timer: TimerTypes,
    setTimer: SetTimerTypes,

    questions: ItemQuestionType[],
    addQuestion: addQuestionType,
    removeQuestion: removeQuestionType,
    dropQuestion: dropQuestionType

}

export const QuestionnaireStore = create<QuestionnaireStoreProps>()((set, get) => ({
    timer: 20,
    setTimer: (new_time) => {
        try {
            const result = TimerSchemas.safeParse(new_time)
            if (result.success) {
                set({
                    timer: new_time
                })
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    type: "zod error",
                    message: error.message
                }
            }
        }
    },


    questions: [],
    addQuestion: (question) => {
        try {
            const result = ItemQuestionSchemas.safeParse(question)

            if (result.success) {
                const _old = get().questions
                set({
                    questions: [..._old, question]
                })
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                return {
                    type: "zod error",
                    message: error.message
                }
            }
        }
    },
    removeQuestion: (uuid) => {
        try {
            const _new = get().questions.filter(el => el.uuid != uuid)
            set({
                questions: _new
            })
        } catch (error) {
            console.log()
        }
    },
    dropQuestion: () => ({ questions: [] }),
}))