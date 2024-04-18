import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { v4 as uuidv4 } from "uuid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm, Controller, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { TrashIcon } from "@radix-ui/react-icons";

import {
  TextSchemas,
  ForCreateQuestionType,
  ForCreateQuestionSchemas,
} from "@/schemas/questions.schemas";
import { QuestionStore } from "@/store/questions.store";

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

export const CreateQuestion = () => {
  const navigate = useNavigate();
  const [isDisableAddOption, setIsDisableAddOption] = useState<boolean>(false);
  const [isDisableCreateButton, setIsDisableCreateButton] =
    useState<boolean>(true);
  const { questions, addNewQuestion } = QuestionStore();

  const form = useForm<ForCreateQuestionType>({
    resolver: zodResolver(ForCreateQuestionSchemas),
    defaultValues: {
      uuid: uuidv4(),
      text: "",
      option: [],
    },
  });

  const { fields, remove, append, update } = useFieldArray({
    control: form.control,
    name: "option",
  });

  // ############################## CHECKING VALUES ##############################
  const questionText = useWatch({ control: form.control, name: "text" });
  const questionOption = useWatch({ control: form.control, name: "option" });

  // ################################# HANDLERS ##################################
  const isUniqueValue = (t: string) => {
    return questionOption.some(
      (el) => el.text.trim().toLowerCase() == t.trim().toLowerCase()
    );
  };

  const checkUniqueValues = () => {
    if (questionOption.length < 2) return;

    const stack: string[] = [];

    questionOption.forEach((el, idx) => {
      const error = stack.includes(el.text.trim().toLowerCase());
      update(idx, { ...el, error });
      stack.push(el.text);
    });
  };

  useEffect(() => {
    const result = questionOption.every((el) => {
      return TextSchemas.safeParse(el.text).success;
    });
    result ? setIsDisableAddOption(false) : setIsDisableAddOption(true);
  }, [questionOption]);

  useEffect(() => {
    const main_check = ForCreateQuestionSchemas.safeParse(form.getValues());
    console.log(main_check, "main_check");
    setIsDisableCreateButton(!main_check.success);
  }, [questionText, questionOption, form, isDisableAddOption]);

  const AddNewQuestion = () => {
    const data = form.getValues();

    const result = questions.some(
      (el) => el.text.trim().toLowerCase() == data.text.trim().toLowerCase()
    );

    if (result) {
      toast.error("ERROR!!! Такой вопрос уже существует");
    } else {
      const _data_option = data.option.map(({ isTrue, text, uuid }) => ({
        isTrue,
        text,
        uuid,
      }));

      addNewQuestion({
        uuid: data.uuid,
        text: data.text,
        option: _data_option,
      });
      toast.success("Вопрос добавлен");
      navigate({
        to: "/questions",
        replace: true,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(() => ({}))} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
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
                name={`option.${idx}.text`}
                render={({ field }) => (
                  <Checkbox
                    {...field}
                    className="w-5 h-5"
                    onClick={() => {
                      update(idx, {
                        ...item,
                        isTrue: !item.isTrue,
                      });
                    }}
                  />
                )}
                control={form.control}
              />

              <Controller
                name={`option.${idx}.text`}
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
              isTrue: false,
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
