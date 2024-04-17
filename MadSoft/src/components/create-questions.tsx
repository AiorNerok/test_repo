import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form";
import { toast } from "sonner";

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
import { TextSchemas } from "@/store/schemas/questions.schemas";

import { QuestionnaireStore } from "@/store/questions";

export const CreateQuestions = () => {
  const [isDisableAddOption, setIsDisableAddOption] = useState<boolean>(false);
  const [isDisableCreateButton, setIsDisableCreateButton] =
    useState<boolean>(true);

  const { addQuestion, questions } = QuestionnaireStore();

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
  const question = useWatch({ control: form.control, name: "question" });
  const options = useWatch({ control: form.control, name: "options" });

  // ################################# HANDLERS ##################################
  const isUniqueValue = (t: string) => {
    return options.some(
      (el) => el.text.trim().toLowerCase() == t.trim().toLowerCase()
    );
  };

  const checkUniqueValues = () => {
    if (options.length < 2) return;

    const stack: string[] = [];

    options.forEach((el, idx) => {
      if (stack.includes(el.text.trim().toLowerCase())) {
        update(idx, { ...el, error: true });
      } else {
        update(idx, { ...el, error: false });
      }
      stack.push(el.text);
    });
  };

  useEffect(() => {
    const result = options.every((el) => {
      return TextSchemas.safeParse(el.text).success;
    });
    result ? setIsDisableAddOption(false) : setIsDisableAddOption(true);
  }, [options]);

  useEffect(() => {
    const main_check = ItemQuestionSchemas.safeParse(form.getValues());
    if (main_check.success) {
      setIsDisableCreateButton(false);
    } else {
      setIsDisableCreateButton(true);
    }
  }, [question, options, form]);

  const AddNewQuestion = () => {
    const data = form.getValues();

    const result = questions.some(
      (el) =>
        el.question.trim().toLowerCase() == data.question.trim().toLowerCase()
    );

    if (result) {
      toast.error("ERROR!!! Такой вопрос уже существует");
    } else {
      addQuestion(data);
      form.reset();
      toast.success("Вопрос добавлен");
    }
  };

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
                    onInput={(e) => {
                      const result = isUniqueValue(e.currentTarget.value);
                      update(idx, { ...item, error: result });
                    }}
                  />
                )}
                control={form.control}
              />

              <Button
                type="button"
                onClick={() => {
                  checkUniqueValues();
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
            setIsDisableAddOption(true);
            append({
              text: "",
              uuid: uuidv4(),
              isCurrentAnswer: false,
              error: false,
            });
          }}
        >
          Добавить вариант ответа
        </Button>

        <Button
          type="submit"
          className="w-full"
          disabled={isDisableCreateButton}
          onClick={() => {
            AddNewQuestion();
          }}
        >
          Сохранить вопрос
        </Button>
      </form>
    </Form>
  );
};
