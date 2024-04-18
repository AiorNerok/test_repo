import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnswerStore } from "@/store/answer.store";
import { CheckCircledIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { AnswerOptionBaseToRenderType } from "@/schemas/answer.schemas";

export const ResultStage = () => {
  const { list, timeDuration } = AnswerStore();

  const [toRender, setToRender] = useState<>();

  const min = Math.floor(timeDuration / 60);
  const sec = timeDuration % 60;

  useEffect(() => {
    const _list_new = list.map((el) =>
      el.option.map((i) => ({ ...i, isSuccess: i.isTrue != i.isSelected }))
    );
  }, [list]);

  return (
    <div className="space-y-3">
      <div>
        <p>
          Венро отвечено на: {} / {list.length}{" "}
        </p>
        <p>
          Время прохождение теста:{" "}
          {`${min > 9 ? min : "0" + min} : ${sec > 9 ? sec : "0" + sec}`}
        </p>
        <Button>Пройти еще раз</Button>
      </div>
      {list_to_render.map((el) => {
        return (
          <Card
            key={el.uuid}
            className={cn({
              "border-green-300": el.isSuccess,
              "border-red-300": !el.isSuccess,
            })}
          >
            <CardHeader>
              <CardTitle>{el.question}</CardTitle>
            </CardHeader>
            <CardContent>
              {el.answer.map(({ text, uuid, isChecked, isCurrentAnswer }) => {
                return (
                  <p
                    className={cn("flex gap-2 items-center", {
                      "text-green-400": isCurrentAnswer,
                      "text-red-600":
                        isChecked == true && isCurrentAnswer == false,
                    })}
                    key={uuid}
                  >
                    {text}

                    {isChecked == true && isCurrentAnswer == true && (
                      <CheckCircledIcon />
                    )}
                    {isChecked == true && isCurrentAnswer == false && (
                      <Cross1Icon className="text-red-600" />
                    )}
                  </p>
                );
              })}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
