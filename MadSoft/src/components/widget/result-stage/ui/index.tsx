import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { AnswerStore } from "@/store/answer.store";
import { CommonStore } from "@/store/common.store";
import { CheckCircledIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

import { AnswerOptionToRenderType } from "@/schemas/answer.schemas";


export const ResultStage = () => {
  const { list, timeDuration, drop } = AnswerStore();
  const { resetStage } = CommonStore()
  const [toRender, setToRender] = useState<AnswerOptionToRenderType[]>([]);
  const [successCount, setSuccessCount] = useState(0)
  const min = Math.floor(timeDuration / 60);
  const sec = timeDuration % 60;

  useEffect(() => {
    const _list_new = list.map((el) => {

      let _is_success = true

      el.option.forEach(({ isSelected, isTrue }) => {
        if (isSelected != isTrue) {
          _is_success = false
        }
      })

      return {
        ...el,
        isSuccess: _is_success
      }
    }
    );
    setToRender(_list_new)
    const _is_success_count = _list_new.filter(el => el.isSuccess).length
    setSuccessCount(_is_success_count)
  }, [list]);

  const handleDropState = () => {
    drop()
    resetStage()
  }

  return (
    <div className="space-y-3">
      <div className="space-y-3">
        <p>
          Венро отвечено на:{" "} {successCount} / {list.length}
        </p>
        <p>
          Время прохождение теста:{" "}{`${min > 9 ? min : "0" + min} : ${sec > 9 ? sec : "0" + sec}`}
        </p>
        <Button onClick={handleDropState}>Пройти еще раз</Button>
      </div>
      {toRender.map(({ uuid, isSuccess, option, text }) => {
        return (
          <Card
            key={uuid}
            className={cn({
              "border-green-300": isSuccess,
              "border-red-300": !isSuccess,
            })}
          >
            <CardHeader>
              <CardTitle>{text}</CardTitle>
            </CardHeader>
            <CardContent>
              {option.map(({ text, uuid, isSelected, isTrue }) => {
                return (
                  <p
                    className={cn("flex gap-2 items-center", {
                      "text-green-400": isTrue,
                      "text-red-600":
                        isSelected == true && isTrue == false,
                    })}
                    key={uuid}
                  >
                    {text}

                    {isSelected && isTrue && true && (<CheckCircledIcon />)}
                    {isSelected == true && isTrue == false && (
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
