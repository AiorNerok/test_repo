import { z } from 'zod'
import { create } from 'zustand'

import type {
    removeQuestionType,
    dropQuestionType,
    AppendNewQuestionStoreType,
    QuestionListType,
} from '../schemas/questions.schemas'

import { QuestionListSchemas } from '../schemas/questions.schemas'

type QuestionnaireStoreProps = {
    questions: QuestionListType,
    addNewQuestion: AppendNewQuestionStoreType,
    removeQuestion: removeQuestionType,
    dropQuestion: dropQuestionType
}

export const QuestionStore = create<QuestionnaireStoreProps>()((set, get) => ({
    questions: [{ "uuid": "85fcf5b3-051b-46a4-b30b-eaa61140a6fe", "text": "Последняя Мажоная версия Python?", "option": [{ "isTrue": false, "text": "Python 3", "uuid": "4bec90b2-ad2a-4f96-a664-499bc24ff8c3" }, { "isTrue": false, "text": "Python 4", "uuid": "2c3588ad-b17e-4b85-8fa1-5315068eecb6" }, { "isTrue": false, "text": "Python 2049", "uuid": "0372abd5-dfc8-41ef-8240-29e6145f2c17" }, { "isTrue": true, "text": "Райн Гослинг", "uuid": "a2f60a85-eb33-4d15-834a-25ad598f5e5a" }] }, { "uuid": "b2ef8c1a-7d92-40a4-843d-d92634abe09d", "text": "Сколько пальцев на руке", "option": [{ "isTrue": true, "text": "пять", "uuid": "fd3fdfa3-d0d1-425f-81b0-367d88f51a01" }, { "isTrue": true, "text": "все", "uuid": "881d05b0-8990-4d65-9da9-12169c5a96ba" }, { "isTrue": false, "text": "сколько надо столько и надо", "uuid": "2081827d-8896-4b54-8863-ca3afbfa6a80" }] }, { "uuid": "3537e001-0843-43e4-acb8-1e19dbcee25d", "text": "продолжи фразу \"Гига...\"", "option": [{ "isTrue": true, "text": "Чад", "uuid": "17d446f1-292b-400e-8762-33e74a45c0b2" }, { "isTrue": true, "text": "Чат", "uuid": "459950f0-6d3d-444f-a11d-c92bac7432cb" }, { "isTrue": true, "text": "Байт", "uuid": "a2c28c2b-68e8-4fec-8c67-b949d3c013ad" }] }],
    addNewQuestion: (question) => {
        try {
            const result = QuestionListSchemas.safeParse(question)
            console.log("result", question, result)
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