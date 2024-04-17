import { Toaster } from "@/components/ui/sonner";
import { CreateQuestions } from "./components/create-questions";
function App() {
  return (
    <div className="max-w-2xl flex pt-16 justify-center mx-auto min-h-dvh">
      <Toaster />
      <CreateQuestions />
    </div>
  );
}

export default App;
