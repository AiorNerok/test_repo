import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AnswerStore } from "@/store/answer.store";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ItemQuestionType } from "@/schemas/questions.schemas";
import { checkEnum } from "@/schemas/common.schemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { answerType } from "@/schemas/answer.schemas";

type RenderQuestionProps = ItemQuestionType;

export const RenderQuestion = ({
  question,
  options,
  uuid,
}: RenderQuestionProps) => {
  // ---------------------------------------------------------------------------------------------------------------------
  const [typeOption, setTypeOption] = useState<checkEnum>();
  useEffect(() => {
    options.filter((el) => el.isCurrentAnswer).length > 1
      ? setTypeOption(checkEnum.CHECKBOX)
      : setTypeOption(checkEnum.RADIO);
  }, [options]);

  // ---------------------------------------------------------------------------------------------------------------------

  const [answer, setAnswer] = useState<answerType>([]);
  useEffect(() => {
    const _answer_init = options.map(({ isCurrentAnswer, text, uuid }) => ({
      isCurrentAnswer,
      text,
      uuid,
      isChecked: false,
    }));
    setAnswer(_answer_init);
  }, [options]);

  const { add } = AnswerStore();

  const answerAdapter = () => {
    const _answer_array_adapter: answerType = answer.map(
      ({ isChecked, isCurrentAnswer, text, uuid }) => ({
        uuid,
        text,
        isCurrentAnswer,
        isChecked,
      })
    );
    const _answer_object_adapter = {
      uuid,
      question,
      answer: _answer_array_adapter,
    };
    add(_answer_object_adapter);
  };

  const handleChange = (uuid: string) => {
    console.log("click", uuid);
    const _new_answer = answer.map((el) =>
      el.uuid == uuid ? { ...el, isChecked: !el.isChecked } : el
    );
    setAnswer(_new_answer);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="capitilize">{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {typeOption == checkEnum.CHECKBOX &&
          answer.map((item) => (
            <Label
              key={item.uuid}
              htmlFor={item.uuid}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <Checkbox
                onCheckedChange={() => handleChange(item.uuid)}
                id={item.uuid}
              />
              <span>{item.text}</span>
            </Label>
          ))}
        {typeOption == checkEnum.RADIO && (
          <RadioGroup className="gap-4">
            {options.map((item) => (
              <div key={item.uuid}>
                <Label
                  htmlFor={item.uuid}
                  onClick={() => {
                    const _new_answer = answer.map((el) => {
                      if (el.uuid == item.uuid) {
                        return {
                          ...el,
                          isCurrentAnswer: true,
                        };
                      } else {
                        return { ...el, isCurrentAnswer: false };
                      }
                    });
                    setAnswer(_new_answer);
                  }}
                  className="flex item-center gap-2"
                >
                  <RadioGroupItem value={item.text} id={item.uuid} />
                  <span>{item.text}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={answerAdapter}>Ответить</Button>
      </CardFooter>
    </Card>
  );
};
