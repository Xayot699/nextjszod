import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import DeleteButton from "./delete-button";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function TodoDetailPage({
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
    <main className="mx-auto max-w-3xl p-8">
      <Link href="/todos">← Back</Link>

      <h1 className="my-6 text-3xl font-bold">
        {todo.title}
      </h1>

      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-5 text-white">
        <code>{todo.code || "// No code yet"}</code>
      </pre>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/todos/${id}/edit`}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          Edit
        </Link>

        <DeleteButton id={todo.id} />
      </div>
    </main>
  );
}