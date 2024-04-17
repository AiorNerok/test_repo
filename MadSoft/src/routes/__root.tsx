import { cn } from "@/lib/utils";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: Nav,
});

function Nav() {
  return (
    <div className={cn("flex flex-col w-full")}>
      <div
        className={cn("flex gap-2", {
        })}
      >
        <Link to="/" className="[&.active]:font-bold">
          Главная
        </Link>{" "}
        <Link to="/questions" className="[&.active]:font-bold">
          Все вопросы
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          Эбоут
        </Link>
        <hr />
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  );
}
