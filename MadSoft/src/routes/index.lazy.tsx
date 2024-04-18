import { createLazyFileRoute } from "@tanstack/react-router";

import { CommonStore } from "@/store/common.store";
import { StageEnum } from "@/schemas/common.schemas";
import {
  PreparationStage,
  ResultStage,
  TestingStage,
} from "@/components/widget";

export const Route = createLazyFileRoute("/")({ component: Index });
function Index() {
  const { Stage } = CommonStore();
  return (
    <>
      {Stage == StageEnum.PREPARATION && <PreparationStage />}
      {Stage == StageEnum.TESTING && <TestingStage />}
      {Stage == StageEnum.RESULT && <ResultStage />}
    </>
  );
}
