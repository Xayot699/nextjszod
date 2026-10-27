import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-black dark:text-zinc-50">
          My Code Todos
        </h1>
        <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
          Next.js + Server Actions + Supabase
        </p>
        <Link
          href="/todos"
          className="mt-8 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Go to Todos
        </Link>
      </div>
    </main>
  );
}