import { SetTimeDurationType, TimeDurationType } from './../schemas/common.schemas';
import type { answerTestType, setAnswerHandlerType } from "@/schemas/answer.schemas"
import { answerTestSchemas } from "@/schemas/answer.schemas"
import { create } from "zustand"

type AnswerStoreProps = {
    list: answerTestType[]
    add: setAnswerHandlerType,
    drop: () => void,

    timeDuration: TimeDurationType,
    setTimeDuration: SetTimeDurationType
}

export const AnswerStore = create<AnswerStoreProps>()((set, get) => ({
    list: [],
    add: (item) => {
        const _list = get().list
        const result = answerTestSchemas.safeParse(item)

        if (result.success) {
            set({
                list: [..._list, item]
            })
        }
    },
    drop: () => set({ list: [] }),

    timeDuration: 0,
    setTimeDuration: (n) => set({
        timeDuration: n
    })
}))