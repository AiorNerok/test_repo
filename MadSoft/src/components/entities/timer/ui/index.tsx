type TimerProps = Record<"minutes" | "seconds", number>;

export const Timer = ({ minutes, seconds }: TimerProps) => (
  <div>
    Осталось:{" "}
    {`${minutes > 9 ? minutes : "0" + minutes} : ${seconds > 9 ? seconds : "0" + seconds}`}
  </div>
);
