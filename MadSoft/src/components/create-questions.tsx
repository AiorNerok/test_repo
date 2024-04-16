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
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";

export const CreateQuestions = () => {
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
  const r = useWatch({ control: form.control, name: "options" });

  const noEmptyOptionValues = () => r.every((el) => el.text.trim() != "");
  const allValuesOptionsUnique = () => {
    const text = r.map((el) => el.text);
    return new Set(text).size == r.length ? true : false;
  };

  // ################################# HANDLERS ##################################
  const addNewOption = () =>
    append({ text: "", uuid: uuidv4(), isCurrentAnswer: false });

  const isOptionValueUnique = (s: string) => {
    const result = form
      .getValues()
      .options.filter(
        (el) => el.text.trim().toLowerCase() == s.trim().toLowerCase()
      ).length;

    console.log(result);
    return result;
  };

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
                    onInput={(e: React.FormEvent<HTMLInputElement>) => {
                      isOptionValueUnique(e.currentTarget.value)
                        ? form.setError(`options.${idx}`, {
                            type: "custom",
                            message: "not unique values",
                          })
                        : form.clearErrors(`options.${idx}`);
                    }}
                    placeholder="Тут пиши вариант ответа"
                    className={cn({
                      "text-red-600": form.getFieldState(`options.${idx}`)
                        .error,
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

                  noEmptyOptionValues();
                  allValuesOptionsUnique();
                }}
              >
                <TrashIcon />
              </Button>
            </li>
          ))}
        </ul>
        <Button
          className="w-full"
          type="button"
          disabled={!noEmptyOptionValues()}
          onClick={() => {
            addNewOption();

            // noEmptyOptionValues();
            // allValuesOptionsUnique();
          }}
        >
          Добавить вариант ответа
        </Button>

        <Button type="submit" className="w-full">
          Сохранить вопрос
        </Button>
      </form>
    </Form>
  );
};
