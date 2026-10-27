import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { cacheLife } from "next/cache";

async function getTodos() {
  "use cache";
  cacheLife("minutes");

  const { data, error } = await supabase
    .from("todos")
    .select("id, title, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export default async function TodosPage() {
  const todos = await getTodos();

  return (
    <main className="mx-auto max-w-3xl p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          My Todos
        </h1>

        <Link
          href="/todos/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white"
        >
          + Add Todo
        </Link>
      </div>

      <div className="space-y-3">
        {todos?.map((todo) => (
          <Link
            key={todo.id}
            href={`/todos/${todo.id}`}
            className="block rounded-lg border p-4 hover:bg-gray-100 hover:text-black"
          >
            {todo.title}
          </Link>
        ))}

        {todos?.length === 0 && (
          <p>Hozircha Todolar mavjud emas.</p>
        )}
      </div>
    </main>
  );
}