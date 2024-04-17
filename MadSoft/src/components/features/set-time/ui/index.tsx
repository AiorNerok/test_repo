import { CommonStore } from '@/store/common.store'
import { Input } from "@/components/ui/input";

export const SetTime = () => {
    const { timer, setTimer } = CommonStore()

    const setTimerHandler = (e: React.FormEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value)) {
            setTimer(Number(e.currentTarget.value));
        }
    };

    return <div className="p-2">
        <div className="flex items-center flex-col">
            <div className="flex items-center w-full">
                <p className="flex-1">Время на прохождение теста (в минутах):</p>
                <Input
                    value={timer}
                    onChange={(e) => setTimerHandler(e)}
                    className="w-auto"
                />
            </div>
        </div>
    </div>
}