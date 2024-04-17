import { useState } from "react";
import { Input } from "@/components/ui/input";
import { QuestionnaireStore } from "@/store/questions";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Timer } from "@/components/timer";
import { RenderQuestion } from "@/components/render-question";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const { timer, setTimer, questions, setStatredStatus, isStatredStatus } =
    QuestionnaireStore();
  const [answers, setAnswer] = useState([]);
  const [isCompleted, setIsCompleted] = useState<boolean>();

  const setTimerHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value)) {
      setTimer(Number(e.currentTarget.value));
    }
  };

  function* myGenerator(array) {
    for (let i = 0; i < array.length; i++) {
      yield array[i];
    }
  }
  const gen = myGenerator(questions);

  return (
    <div className="p-2">
      <div
        className={cn("flex items-center flex-col", {
          hidden: isStatredStatus,
        })}
      >
        <div className="flex items-center w-full">
          <p className="flex-1">Время на прохождение теста:</p>
          <Input
            value={timer}
            onChange={(e) => setTimerHandler(e)}
            className="w-auto"
          />
        </div>
        <div className="">
          <Button onClick={setStatredStatus}>Начать</Button>
        </div>
      </div>
      {isStatredStatus && (
        <div>
          <Timer time={timer} />
          <div>
            <RenderQuestion
              question={questions}
              setAnswer={setAnswer}
              setCompleted={setIsCompleted}
            />
          </div>
        </div>
      )}
    </div>
  );
}
