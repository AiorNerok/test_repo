import { ItemQuestionType } from "@/schemas/questions.schemas";
import { checkEnumType, chooseOptionType } from "@/schemas/common.schemas";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type ItemQuestionProps = ItemQuestionType & {
  chooseVariants: chooseOptionType;
};

export const ItemQuestion = ({
  question,
  options,
  chooseVariants,
}: ItemQuestionProps) => {
  const typeAnswer: checkEnumType =
    options.map((item) => item.isCurrentAnswer).length > 1
      ? "checkbox"
      : "radio";
  return (
    <div>
      <div className="mt-11">
        <h2>{question}</h2>
      </div>
      {typeAnswer == "checkbox" && (
        <div>
          <ul>
            {options.map((el) => (
              <li key={el.uuid} className="py-2">
                <Label className="flex items-center space-x-2">
                  <Checkbox /> <span>{el.text}</span>
                </Label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {typeAnswer == "radio" && (
        <div>
          {options.map((el) => {
            return (
              <RadioGroup
                key={el.uuid}
                onChange={() => chooseVariants([el.uuid])}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={el.text} id={el.uuid} />
                  <Label htmlFor={el.uuid}>{el.text}</Label>
                </div>
              </RadioGroup>
            );
          })}
        </div>
      )}
    </div>
  );
};
