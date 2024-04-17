type TimerProps = {
  minutes: number,
  seconds: number
};

export const TimerFormatter = ({ minutes, seconds }: TimerProps) => {
  return <div>
    {`${minutes >= 10 ? minutes : "0" + minutes} : ${seconds >= 10 ? seconds : "0" + seconds}`}
  </div>

};
