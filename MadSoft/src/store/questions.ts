import { z } from 'zod'
import { create } from 'zustand'

import {
    type QuestionType,
    type AddNewQuestionType,
    type RemoveQuestionType,
    type DropQuestionType,
    QuestionSchemas
} from './questions.schemas'

import {
    TimerSchemas,
    type TimerTypes,
    type SetTimerTypes
} from './timer.schemas'

type QuestionsStoreProps = {
    timer: TimerTypes,
    setTimer: SetTimerTypes,

    questions: QuestionType[],
    addQuestion: AddNewQuestionType,
    removeQuestion: RemoveQuestionType,
    dropQuestion: DropQuestionType

}

export const QuestionsStore = create<QuestionsStoreProps>()((set, get) => ({

    timer: 20,
    setTimer: (new_time) => {
        try {
            let result = TimerSchemas.safeParse(new_time)

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
            let result = QuestionSchemas.safeParse(question)

            if (result.success) {
                let _old = get().questions

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
            let _new = get().questions.filter(el => el.uuid != uuid)
            set({
                questions: _new
            })
        } catch (error) {

        }
    },
    dropQuestion: () => ({ questions: [] }),
}))