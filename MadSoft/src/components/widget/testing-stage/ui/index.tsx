import { useTimer } from 'react-timer-hook'

import { Timer } from "@/components/entities"
import { RenderQuestion } from '@/components/features/render-question/ui'

import { CommonStore } from '@/store/common.store'
import { QuestionStore } from '@/store/questions.store'

export const TestingStage = () => {
    const { timer } = CommonStore()
    const { questions } = QuestionStore()
    //----------------------------------------------------------- 
    const time = new Date();
    time.setSeconds(timer * 60)
    const { minutes, seconds, isRunning, pause, totalSeconds } = useTimer({ expiryTimestamp: time })

    return (
        <>
            <div>
                <Timer minutes={minutes} seconds={seconds} />
            </div>
            <RenderQuestion {...questions[0]} />
        </>
    )
}