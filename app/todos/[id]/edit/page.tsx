import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { updateTodo } from "../../actions";
import TodoForm from "@/components/todo-form";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditTodoPage({
  params,
}: Props) {
  const { id } = await params;

  const { data: todo, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!todo) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-2xl p-8">
      <h1 className="mb-6 text-3xl font-bold">
        Edit Todo
      </h1>

      <TodoForm
        action={updateTodo}
        cancelHref={`/todos/${id}`}
        code={todo.code}
        id={todo.id}
        title={todo.title}
        variant="edit"
      />
    </main>
  );
}