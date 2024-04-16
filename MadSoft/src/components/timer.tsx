import { useEffect, useState } from "react"

type TimerProps = {
    time: number
}

export const Timer = ({ time }: TimerProps) => {

    const [timer, setTimer] = useState<number>(time * 60)

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);

        if (timer < 1) {
            clearInterval(intervalId)
            console.log('stop')
        }

        return () => clearInterval(intervalId);
    }, [timer])

    return (
        <p>
            {format(timer)}
        </p>
    )
}

function format(num: number): string {
    let min = Math.floor(num / 60)
    let sec = num % 60

    let min_tostring = min > 9 ? min : '0' + min
    let sec_tostring = sec > 9 ? sec : '0' + sec

    return `${min_tostring} : ${sec_tostring}`
}