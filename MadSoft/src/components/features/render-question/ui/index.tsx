import { useEffect, useState } from "react"

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { AnswerStore } from "@/store/answer.store"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { ItemQuestionType } from "@/schemas/questions.schemas"
import { checkEnum } from "@/schemas/common.schemas"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { answerType } from "@/schemas/answer.schemas"

type RenderQuestionProps = ItemQuestionType

export const RenderQuestion = ({ question, options, uuid }: RenderQuestionProps) => {
    // ---------------------------------------------------------------------------------------------------------------------
    const [typeOption, setTypeOption] = useState<checkEnum>()
    useEffect(() => {
        options.filter(el => el.isCurrentAnswer).length > 1 ? setTypeOption(checkEnum.CHECKBOX) : setTypeOption(checkEnum.RADIO)
    }, [])

    // ---------------------------------------------------------------------------------------------------------------------
    const _answer_init = options.map(item => {
        return {
            uuid: item.uuid,
            isChecked: false
        }
    })


    const [answer, setAnswer] = useState<answerType>(_answer_init)
    const { add } = AnswerStore()
    return (
        <Card>
            <CardHeader>
                <CardTitle className="capitilize">{question}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {typeOption == checkEnum.CHECKBOX &&
                    options.map(item => (
                        <Label key={item.uuid} className="flex items-center space-x-2" htmlFor={item.uuid}
                            onClick={() => {
                                const _new_answer = answer.map(el => {
                                    if (el.uuid == item.uuid) {
                                        return {
                                            ...el,
                                            isChecked: !el.isChecked
                                        }
                                    }
                                    return el
                                })

                                setAnswer(_new_answer)
                            }}
                        >
                            <Checkbox id={item.uuid} /> <span>{item.text}</span>
                        </Label>
                    ))
                }
                {typeOption == checkEnum.RADIO &&
                    <RadioGroup className="gap-4">
                        {
                            options.map(item => (
                                <div key={item.uuid}>
                                    <Label htmlFor={item.uuid} onClick={() => {
                                        const _new_answer = answer.map(el => {
                                            if (el.uuid == item.uuid) {
                                                return {
                                                    ...el,
                                                    isChecked: true
                                                }
                                            } else {
                                                return { ...el, isChecked: false }
                                            }
                                        })
                                        setAnswer(_new_answer)
                                    }}
                                        className="flex item-center gap-2">
                                        <RadioGroupItem value={item.text} id={item.uuid} />
                                        <span>{item.text}</span>
                                    </Label>
                                </div>
                            ))
                        }
                    </RadioGroup>
                }
            </CardContent>
            <CardFooter>
                <Button
                    onClick={
                        () => add({
                            uuid, answer: { ...answer }
                        })
                    }
                >Ответить</Button>
            </CardFooter>
        </Card>
    )
}