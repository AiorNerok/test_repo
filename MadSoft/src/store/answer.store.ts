import type { answerTestType, setAnswerHandlerType } from "@/schemas/answer.schemas"
import { answerTestSchemas } from "@/schemas/answer.schemas"
import { create } from "zustand"

type AnswerStoreProps = {
    list: answerTestType[]
    add: setAnswerHandlerType,
    drop: () => void
}

export const AnswerStore = create<AnswerStoreProps>()((set, get) => ({
    list: [],
    add: (item) => {
        const _list = get().list
        const result = answerTestSchemas.safeParse(item)

        if (result.success) {
            console.log(item)

            set({
                list: [..._list, item]
            })
        }
    },
    drop: () => set({ list: [] })
}))