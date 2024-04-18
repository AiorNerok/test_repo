import { QuestionStore } from "@/store/questions.store";
import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createLazyFileRoute("/questions/")({
  component: Questions,
});

function Questions() {
  const { questions, removeQuestion } = QuestionStore();

  return (
    <>
      <Card className="xl:col-span-2 my-2">
        <CardHeader className="flex flex-row items-center space-y-0 justify-between">
          <div className="grid gap-2">
            <CardTitle>Список всех вопросов</CardTitle>
          </div>
          <Button asChild size="sm" className="ml-auto m-0">
            <Link to="/questions/add" className="[&.active]:font-bold">
              <PlusIcon className="h-4 w-4" />
              Добавить вопрос
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {!questions.length && <p>Пока нет вопросов</p>}

          <ul className="space-y-2">
            {questions.map((el) => (
              <li key={el.uuid} className="rounded-xl border p-4">
                <div className="flex items-center justify-between my-2">
                  <p>{el.text}</p>
                  <Button onClick={() => removeQuestion(el.uuid)}>
                    <TrashIcon />
                  </Button>
                </div>
                <hr />
                <div className="py-2">
                  {el.option.map((item, idx) => (
                    <p key={item.uuid}>
                      <span className="w-8 inline-block text-center">
                        {idx + 1})
                      </span>
                      {item.text}
                    </p>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
}
