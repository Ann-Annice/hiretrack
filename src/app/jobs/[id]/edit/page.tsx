import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/app/lib/prisma";
import { JobStatus } from "@prisma/client";

type EditJobPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditJobPage({
  params,
}: EditJobPageProps) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }

  async function updateJob(formData: FormData) {
    "use server";

    await prisma.job.update({
      where: {
        id,
      },
      data: {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        status: formData.get("status") as JobStatus,
      },
    });

    redirect(`/jobs/${id}`);
  }

  return (
    <main className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit Job
      </h1>

      <form action={updateJob} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium">
            Job Title
          </label>

          <input
            type="text"
            name="title"
            defaultValue={job.title}
            className="w-full border rounded p-3"
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            name="description"
            defaultValue={job.description}
            className="w-full border rounded p-3"
            rows={5}
            required
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            defaultValue={job.status}
            className="w-full border rounded p-3"
          >
            <option value="OPEN">OPEN</option>
            <option value="CLOSED">CLOSED</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Update Job
          </button>

          <Link
            href={`/jobs/${id}`}
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}