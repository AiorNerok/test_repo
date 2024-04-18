import { create } from 'zustand'
import { EmptyFunctionType, StageTestingType, StageEnum } from '@/schemas/common.schemas'

type CommonStoreType = {
    timer: number,
    setTimer: (n: number) => void,

    Stage: StageTestingType,
    nextStage: EmptyFunctionType,
    resetStage: EmptyFunctionType
}

export const CommonStore = create<CommonStoreType>()((set, get) => ({
    timer: 20,
    setTimer: (n) => set(({
        timer: n
    })),

    Stage: StageEnum.PREPARATION,
    nextStage: () => {
        const current = get().Stage
        const next = current + 1

        if (next != undefined) {
            set({
                Stage: next
            })
        }
    },
    resetStage: () => set({
        Stage: StageEnum.PREPARATION
    })
}))