import { createTodo } from "../actions";
import TodoForm from "@/components/todo-form";

export default function NewTodoPage() {
  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Create Todo
      </h1>

      <TodoForm
        action={createTodo}
        cancelHref="/todos"
        variant="create"
      />
    </main>
  );
}