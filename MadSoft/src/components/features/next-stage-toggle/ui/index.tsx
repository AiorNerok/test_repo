import { CommonStore } from "@/store/common.store";
import { Button } from "@/components/ui/button";

type NextStageToggleProps = {
  title: string;
};

export const NextStageToggle = ({ title }: NextStageToggleProps) => {
  const { nextStage } = CommonStore();
  return <Button onClick={nextStage}>{title}</Button>;
};
