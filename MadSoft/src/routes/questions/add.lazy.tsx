import { CreateQuestions } from "@/components/widget";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/questions/add")({
  component: Add,
});

function Add() {
  return (
    <div className="p-2">
      <CreateQuestions />
    </div>
  );
}
