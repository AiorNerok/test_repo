import { createLazyFileRoute } from "@tanstack/react-router";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { CommonStore } from "@/store/common.store";
import { RenderQuestions } from "@/components/render-questions";

export const Route = createLazyFileRoute("/")({ component: Index });

function Index() {
  const { timer, setTimer, isTestStarted, runTest } = CommonStore();

  const setTimerHandler = (e: React.FormEvent<HTMLInputElement>) => {
    if (Number(e.currentTarget.value)) {
      setTimer(Number(e.currentTarget.value));
    }
  };

  return (
    <>
      {!isTestStarted && (
        <div className="p-2">
          <div className={cn("flex items-center flex-col", {})}>
            <div className="flex items-center w-full">
              <p className="flex-1">Время на прохождение теста (в минутах):</p>
              <Input
                value={timer}
                onChange={(e) => setTimerHandler(e)}
                className="w-auto"
              />
            </div>
            <div className="">
              <Button
                onClick={() => {
                  runTest();
                  document.body.requestFullscreen();
                }}
              >
                Начать
              </Button>
            </div>
          </div>
        </div>
      )}
      {isTestStarted && <RenderQuestions />}
    </>
  );
}
