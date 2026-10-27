"use client";

import Link from "next/link";
import { useActionState } from "react";
import CodeEditorField from "@/components/code-editor-field";
import type { TodoFormAction, TodoFormState } from "@/app/todos/actions";

type Props = {
  action: TodoFormAction;
  cancelHref: string;
  code?: string;
  id?: string;
  title?: string;
  variant: "create" | "edit";
};

const initialState: TodoFormState = {};

export default function TodoForm({
  action,
  cancelHref,
  code = "",
  id,
  title = "",
  variant,
}: Props) {
  const [state, formAction, pending] = useActionState(
    action,
    initialState,
  );
  const titleError = state.errors?.title?.[0];
  const codeError = state.errors?.code?.[0];

  return (
    <form action={formAction} className="space-y-4">
      {id && <input type="hidden" name="id" value={id} />}

      <div>
        <label htmlFor="title" className="mb-2 block">
          {variant === "create" ? "Todo title" : "Title"}
        </label>
        <input
          id="title"
          type="text"
          name="title"
          defaultValue={title}
          required
          maxLength={150}
          placeholder={variant === "create" ? "React practice" : undefined}
          aria-invalid={Boolean(titleError)}
          aria-describedby={titleError ? "title-error" : undefined}
          className="w-full rounded-lg border p-3"
        />
        {titleError && (
          <p id="title-error" className="mt-1 text-sm text-red-600" role="alert">
            {titleError}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block">Code</label>
        <CodeEditorField defaultValue={code} />
        {codeError && (
          <p className="mt-1 text-sm text-red-600" role="alert">
            {codeError}
          </p>
        )}
      </div>

      {state.message && (
        <p className="text-sm text-red-600" role="alert">
          {state.message}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={pending}
          className={`rounded-lg px-5 py-2 text-white disabled:cursor-not-allowed disabled:opacity-60 ${
            variant === "create" ? "bg-blue-600" : "bg-green-600"
          }`}
        >
          {pending
            ? "Saving..."
            : variant === "create"
              ? "Save Todo"
              : "Update Todo"}
        </button>

        <Link href={cancelHref} className="px-4 py-2">
          Cancel
        </Link>
      </div>
    </form>
  );
}
