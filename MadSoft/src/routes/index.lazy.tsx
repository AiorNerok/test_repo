import { createLazyFileRoute } from "@tanstack/react-router";

import { CommonStore } from "@/store/common.store";
import { stageEnum } from "@/schemas/common.schemas";

import { PreparationStage, TestingStage } from "@/components/widget";

export const Route = createLazyFileRoute("/")({ component: Index });
function Index() {
  const { stage } = CommonStore()
  return (
    <>
      {stage == stageEnum.PREPARATION && <PreparationStage />}
      {stage == stageEnum.TESTING && <TestingStage />}
      {stage == stageEnum.RESULT && <div>Result</div>}
    </>
  );
}
