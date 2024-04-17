import { cn } from "@/lib/utils";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { CommonStore } from "@/store/common.store";

export const Route = createRootRoute({
  component: Nav,
});

function Nav() {
  const { isTestStarted } = CommonStore();
  return (
    <div className={cn("flex flex-col w-full")}>
      <div
        className={cn("p-2 flex gap-2", {
          hidden: isTestStarted,
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
        <hr />
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
