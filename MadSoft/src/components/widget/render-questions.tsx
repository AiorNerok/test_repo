import { useState } from "react";
import { useTimer } from 'react-timer-hook'
// import { AnswerStore } from "@/store/answer.store";
import { QuestionStore } from "@/store/questions.store";
import { CommonStore } from "@/store/common.store";

import { Button } from "../ui/button";
import { TimerFormatter } from "../shared/timer";
import { ItemQuestion } from "../shared/item-question";
import { ItemQuestionType } from "@/schemas/questions.schemas";

export const RenderQuestions = () => {
  //   const { add } = AnswerStore();
  const { questions } = QuestionStore();
  const { timer } = CommonStore()
  // TIMER
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer * 60);
  const { minutes, seconds, pause, isRunning, totalSeconds } = useTimer({ expiryTimestamp: time })
  // 
  const [count, setCount] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const completeTest = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      pause()
      console.log(totalSeconds)
    }
  };

  function* generateSequence(arr: ItemQuestionType[]) {
    for (let i = 0; i < arr.length; i++) {
      yield arr[i];
    }
  }

  const sequence = generateSequence(questions);

  const NextQuestion = () => {
    const { done, value } = sequence.next()
    if (done) {

    }
  };

  return (
    <>
      <Button
        onClick={() => {
          completeTest();
        }}
      >
        Завершить досрочно
      </Button>
      <div className="inline-block">
        {JSON.stringify(isRunning)}
        <TimerFormatter minutes={minutes} seconds={seconds} />
      </div>
      <div>
        {/* <ItemQuestion {...currentQuestion} /> */}
      </div>
      <div className="mt-11">
        <Button onClick={NextQuestion}>Зафиксировать ответ</Button>
      </div>
    </>
  );
};
