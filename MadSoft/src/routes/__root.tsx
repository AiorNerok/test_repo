import { cn } from "@/lib/utils";
import { QuestionnaireStore } from "@/store/questions";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Nav,
});

function Nav() {
  const { isStatredStatus } = QuestionnaireStore();

  return (
    <div className={cn("flex flex-col w-full")}>
      <div
        className={cn("p-2 flex gap-2", {
          hidden: isStatredStatus,
        })}
      >
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/questions" className="[&.active]:font-bold">
          Question
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
