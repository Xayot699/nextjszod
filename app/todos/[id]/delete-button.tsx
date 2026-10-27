"use client";

import { deleteTodo } from "../actions";

type Props = {
  id: string;
};

export default function DeleteButton({ id }: Props) {
  const handleDelete = async () => {
    const formData = new FormData();

    formData.set("id", id);

    await deleteTodo(formData);
  };

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-5 py-2 text-white"
    >
      Delete
    </button>
  );
}