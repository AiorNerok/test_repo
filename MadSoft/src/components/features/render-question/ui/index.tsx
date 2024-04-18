import { useEffect, useState } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { QuestionItemType } from "@/schemas/questions.schemas";
import { checkEnum } from "@/schemas/common.schemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AnswerOptionBaseType } from "@/schemas/answer.schemas";
import { AnswerStore } from "@/store/answer.store";

type RenderQuestionProps = QuestionItemType;

export const RenderQuestion = ({ option, text, uuid }: RenderQuestionProps) => {
    // ---------------------------------------------------------------------------------------------------------------------
    const [typeOption, setTypeOption] = useState<checkEnum>();
    useEffect(() => {
        const result =
            option.filter((el) => el.isTrue).length > 1
                ? checkEnum.CHECKBOX
                : checkEnum.RADIO;
        setTypeOption(result);
    }, [option]);

    // ---------------------------------------------------------------------------------------------------------------------

    const [answer, setAnswer] = useState<AnswerOptionBaseType[]>([]);

    useEffect(() => {
        const _answer_init = option.map((el) => ({ ...el, isSelected: false }));
        setAnswer(_answer_init);
    }, [option]);

    const { add } = AnswerStore();

    const answerAdapter = () => {
        add({
            uuid,
            text,
            option: answer,
        });
    };

    const handleChange = (uuid: string) => {
        const _new_answer = answer.map((el) =>
            el.uuid == uuid ? { ...el, isSelected: !el.isSelected } : el
        );
        setAnswer(_new_answer);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitilize">{text}</CardTitle>
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
                        {option.map((item) => (
                            <div key={item.uuid}>
                                <Label
                                    htmlFor={item.uuid}
                                    onClick={() => {
                                        const _new_answer = answer.map((el) => {
                                            if (el.uuid == item.uuid) {
                                                return {
                                                    ...el,
                                                    isSelected: true,
                                                };
                                            } else {
                                                return { ...el, isSelected: false };
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
            {/* {JSON.stringify(answer)} */}
        </Card>
    );
};
