"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const todoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Todo nomi kiritilishi shart")
    .max(150, "Todo nomi 150 ta belgidan oshmasligi kerak"),
  code: z.string(),
});

const idSchema = z.string().min(1, "Todo ID topilmadi");

export type TodoFormState = {
  errors?: {
    title?: string[];
    code?: string[];
  };
  message?: string;
};

export type TodoFormAction = (
  previousState: TodoFormState,
  formData: FormData,
) => Promise<TodoFormState>;

function getTodoFormData(formData: FormData) {
  return {
    title: formData.get("title"),
    code: formData.get("code") ?? "",
  };
}

export async function createTodo(
  _previousState: TodoFormState,
  formData: FormData,
): Promise<TodoFormState> {
  const parsedTodo = todoSchema.safeParse(getTodoFormData(formData));

  if (!parsedTodo.success) {
    return {
      errors: parsedTodo.error.flatten().fieldErrors,
    };
  }

  const { error } = await supabase
    .from("todos")
    .insert({
      title: parsedTodo.data.title,
      code: parsedTodo.data.code,
    });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/todos");

  redirect("/todos");
}

export async function updateTodo(
  _previousState: TodoFormState,
  formData: FormData,
): Promise<TodoFormState> {
  const parsedId = idSchema.safeParse(formData.get("id"));

  if (!parsedId.success) {
    return { message: parsedId.error.issues[0]?.message };
  }

  const parsedTodo = todoSchema.safeParse(getTodoFormData(formData));

  if (!parsedTodo.success) {
    return {
      errors: parsedTodo.error.flatten().fieldErrors,
    };
  }

  const id = parsedId.data;
  const { data, error } = await supabase
    .from("todos")
    .update({
      title: parsedTodo.data.title,
      code: parsedTodo.data.code,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Todo topilmadi");
  }

  revalidatePath("/todos");
  revalidatePath(`/todos/${id}`);

  redirect(`/todos/${id}`);
}

export async function deleteTodo(formData: FormData) {
  const id = String(
    formData.get("id") ?? ""
  );

  if (!id) {
    throw new Error("Todo ID topilmadi");
  }

  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("O'chiriladigan Todo topilmadi");
  }

  revalidatePath("/todos");

  redirect("/todos");
}