import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form";

import { TrashIcon } from "@radix-ui/react-icons";

import type { ItemQuestionType } from "@/store";
import { ItemQuestionSchemas } from "@/store";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const CreateQuestions = () => {
  const [isDisableAddOption, setIsDisableAddOption] = useState<boolean>(false)
  const [isDisableCreateButton, setIsDisableCreateButton] = useState<boolean>(false)

  const form = useForm<ItemQuestionType>({
    resolver: zodResolver(ItemQuestionSchemas),
    defaultValues: {
      uuid: uuidv4(),
      question: "",
      options: [],
    },
  });

  const { fields, remove, append, update } = useFieldArray({
    control: form.control,
    name: "options",
  });

  // ############################## CHECKING VALUES ##############################
  // const question = useWatch({ control: form.control, name: "question" })
  // let check_value_question = question?.length > 0 ? true : false
  // console.log("check_value_question", check_value_question)

  const options = useWatch({ control: form.control, name: "options" })
  const emptyValues = options.every(el => el.text.trim())


  let repetitive: string[] = []

  for (let i in options) {
    if (repetitive.includes(options[i].text)) {
      update(Number(i), {
        ...options[i], error: true
      })
    } else {
      repetitive.push(options[i].text)
    }
  }
  // ################################# HANDLERS ##################################

  // #############################################################################

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => ({}))} className="space-y-8">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="my-4">
              <FormLabel>Текст вопроса</FormLabel>
              <FormControl>
                <Input placeholder="Тут пиши вопрос" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Label>Варианты ответов</Label>
        <ul className="space-y-2">
          {fields.map((item, idx) => (
            <li className="flex flex-row items-center gap-3" key={item.uuid}>
              <Controller
                name={`options.${idx}.text`}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    className="w-5 h-5"
                    onClick={() => {
                      update(idx, {
                        ...item,
                        isCurrentAnswer: !item.isCurrentAnswer,
                      });
                    }}
                  />
                )}
                control={form.control}
              />

              <Controller
                name={`options.${idx}.text`}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Тут пиши вариант ответа"
                    className={cn({
                      "text-red-600": item.error,
                    })}
                  />
                )}
                control={form.control}
              />
              {form.formState.errors.options?.message}
              <Button
                type="button"
                onClick={() => {
                  remove(idx);
                }}
              >
                <TrashIcon />
              </Button>
            </li>
          ))}
          {!fields.length && <p>Пока ничего нет</p>}
        </ul>
        <Button
          className="w-full"
          type="button"
          disabled={isDisableAddOption}
          onClick={() => {
            append({ text: "", uuid: uuidv4(), isCurrentAnswer: false })
          }}
        >
          Добавить вариант ответа
        </Button>

        <Button
          type="submit"
          className="w-full"
          disabled={isDisableCreateButton}
        >
          Сохранить вопрос
        </Button>
      </form>
    </Form>
  );
};
