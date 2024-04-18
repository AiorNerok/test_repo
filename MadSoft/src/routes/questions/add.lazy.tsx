import { CreateQuestion } from "@/components/features";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/questions/add")({
  component: Add,
});

function Add() {
  return (
    <div className="p-2">
      <CreateQuestion />
    </div>
  );
}
