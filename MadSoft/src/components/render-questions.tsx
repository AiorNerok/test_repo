import { useState } from "react";

// import { AnswerStore } from "@/store/answer.store";
import { QuestionStore } from "@/store/questions.store";

import { Button } from "./ui/button";
import { Timer } from "./shared/timer";
import { ItemQuestion } from "./shared/item-question";
import { ItemQuestionType } from "@/schemas/questions.schemas";

export const RenderQuestions = () => {
  //   const { add } = AnswerStore();
  const { questions } = QuestionStore();

  const [count, setCount] = useState<number>(0);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

  const completeTest = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  function* generateSequence(arr: ItemQuestionType[]) {
    for (let i = 0; i < arr.length; i++) {
      yield arr[i];
    }
  }

  const sequence = generateSequence(questions);

  const NextQuestion = () => {
    console.log(sequence.next());
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
        <Timer />
      </div>
      <div>
        <ItemQuestion {...currentQuestion}  />
      </div>
      <div className="mt-11">
        <Button onClick={NextQuestion}>Зафиксировать ответ</Button>
      </div>
    </>
  );
};
