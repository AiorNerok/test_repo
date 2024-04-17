import { ItemQuestionType } from "@/store";
import { typeCheckEnum } from "@/store/schemas/common.schemas";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { useState } from "react";

type RenderQuestion = {
  q: ItemQuestionType[];
  setAnswer: ({uuid: string[]}) => void: any
  setCompleted: unknown;
};

export const RenderQuestion = ({
  q,
  setAnswer,
  setCompleted,
}: RenderQuestion) => {
  const typeCheck: typeCheckEnum =
    q.map((item) => item.options).length > 1 ? "checkbox" : "radio";

  const [currentAnswer, setCurrentAnswer] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(q[0]);

  const updCurrentAnswer = (uuid: string)=>{
    const l = new Set([...currentAnswer, uuid])
    const n = Array(...l)
    setCurrentAnswer(n)
  }

  const sendAnswer =()=>{
    const uuid = currentQuestion.uuid
    setAnswer({uuid: currentAnswer})
  }

  return (
    <div>
      <div className="flex items-center justify-between my-2">
        <p>{currentQuestion.question}</p>
      </div>
      <hr />
      {typeCheck == typeCheckEnum.Values.checkbox && (
        <div className="py-2">
          {currentQuestion.options.map((el) => (
            <Label>
              <Checkbox className="w-5 h-5" onClick={() => updCurrentAnswer(el.uuid)} />
              {el.text}
            </Label>
          ))}
        </div>
      )}
    </div>
  );
};
