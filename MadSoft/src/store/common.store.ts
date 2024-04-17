import { create } from 'zustand'

type CommonStoreType = {
    timer: number,
    setTimer: (n: number) => void,

    isTestStarted: boolean,
    runTest: () => void,
    stopTest: () => void
}

export const CommonStore = create<CommonStoreType>()((set) => ({
    timer: 20,
    setTimer: (n) => set(({
        timer: n
    })),


    isTestStarted: false,
    runTest: () => set({ isTestStarted: true }),
    stopTest: () => set({ isTestStarted: false }),
}))