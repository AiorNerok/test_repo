import { create } from 'zustand'
import { EmptyFunctionType, stageTestingType, stageEnum } from '@/schemas/common.schemas'

type CommonStoreType = {
    timer: number,
    setTimer: (n: number) => void,

    stage: stageTestingType,
    nextStage: EmptyFunctionType,
    resetStage: EmptyFunctionType
}

export const CommonStore = create<CommonStoreType>()((set, get) => ({
    timer: 20,
    setTimer: (n) => set(({
        timer: n
    })),

    stage: stageEnum.PREPARATION,
    nextStage: () => {
        const current = get().stage
        const next = current + 1

        if (next != undefined) {
            set({
                stage: next
            })
        }
    },
    resetStage: () => set({
        stage: stageEnum.PREPARATION
    })
}))