import { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";

import { Timer } from "@/components/entities";
import { RenderQuestion } from "@/components/features/render-question/ui";

import { CommonStore } from "@/store/common.store";
import { QuestionStore } from "@/store/questions.store";
import { AnswerStore } from "@/store/answer.store";

export const TestingStage = () => {
  const { timer, nextStage } = CommonStore();
  const { questions } = QuestionStore();
  const { list, setTimeDuration } = AnswerStore();
  //----------------------------------------------------------------------------------------------
  const time = new Date();
  time.setSeconds(time.getSeconds() + timer * 60);
  const { minutes, seconds, pause, totalSeconds } = useTimer({
    expiryTimestamp: time,
  });
  //----------------------------------------------------------------------------------------------
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  useEffect(() => {
    if (questions.length == list.length) {
      pause();
      setTimeDuration(timer * 60 - totalSeconds);
      nextStage();
    } else if (questions.length > list.length) {
      setCurrentQuestion(list.length);
    }
  }, [
    list,
    nextStage,
    pause,
    questions.length,
    setTimeDuration,
    timer,
    totalSeconds,
  ]);

  return (
    <>
      <div>
        <Timer minutes={minutes} seconds={seconds} />
      </div>
      <RenderQuestion {...questions[currentQuestion]} />
    </>
  );
};
