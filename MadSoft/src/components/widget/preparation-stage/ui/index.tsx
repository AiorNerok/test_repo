import { NextStageToggle, SetTime } from "@/components/features";

export const PreparationStage = () => {
  return (
    <div>
      <SetTime />
      <NextStageToggle title="Начать тест" />
    </div>
  );
};
