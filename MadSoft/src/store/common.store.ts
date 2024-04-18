import { create } from 'zustand'
import { EmptyFunctionType, stageTestingType, StageEnum } from '@/schemas/common.schemas'

type CommonStoreType = {
    timer: number,
    setTimer: (n: number) => void,

    Stage: stageTestingType,
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