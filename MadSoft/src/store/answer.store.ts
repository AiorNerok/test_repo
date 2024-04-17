import type { answerTestType, setAnswerHandlerType } from "@/schemas/answer.schemas"
import { answerSchemas } from "@/schemas/answer.schemas"
import { create } from "zustand"

type AnswerStoreProps = {
    list: answerTestType[]
    add: setAnswerHandlerType,
    drop: () => void
}

export const AnswerStore = create<AnswerStoreProps>()((set) => ({
    list: [],
    add: (item) => (() => {
        const _new_list = []

        const result = answerSchemas.safeParse(item)

        if (result.success) {
            _new_list.push(item)

            return {
                answerList: _new_list
            }
        }
    }),
    drop: () => set({ list: [] })
}))