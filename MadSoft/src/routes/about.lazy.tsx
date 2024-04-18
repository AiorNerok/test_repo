import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/about")({
  component: About,
});

function About() {
  return <div className="p-2">
    <h2>Стэк:</h2>
    <p> "react": "^18.2.0"</p>
    <p> "react-hook-form": "^7.51.3"</p>
    <p> "react-timer-hook": "^3.0.7"</p>
    <p> "sonner": "^1.4.41"</p>
    <p> "uuid": "^9.0.1"</p>
    <p> "zod": "^3.22.4"</p>
    <p> "zustand": "^4.5.2</p>
  </div>;
}
