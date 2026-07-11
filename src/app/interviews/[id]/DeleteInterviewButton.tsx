"use client";

import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

export default function DeleteInterviewButton({
  id,
}: Props) {
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this interview?"
    );

    if (!confirmed) return;

    const response = await fetch(`/api/interviews/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      alert("Interview deleted successfully!");
      router.push("/interviews");
      router.refresh();
    } else {
      alert("Failed to delete interview.");
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 text-white px-5 py-2 rounded"
    >
      Delete Interview
    </button>
  );
}