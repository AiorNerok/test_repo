import { AnswerStore } from "@/store/answer.store";

export const ResultStage = () => {
  const { list } = AnswerStore();

  //   return <div>{JSON.stringify(list[0], null, 4)}</div>;
  return (
    <div>
      {list.map((el) => {
        return (
          <div key={el.uuid}>
            {el.question}
            <ul>
              {el.answer.map(({ text, uuid }) => {
                return <div key={uuid}>{text}</div>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};
