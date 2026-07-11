import { prisma } from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

interface JobPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function JobPage({ params }: JobPageProps) {
  const { id } = await params;

  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });

  if (!job) {
    notFound();
  }

  async function deleteJob() {
    "use server";

    await prisma.job.delete({
      where: {
        id,
      },
    });

    redirect("/");
  }

  return (
    <main className="max-w-4xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-4">{job.title}</h1>

      <p className="mb-4">{job.description}</p>

      <p className="font-semibold mb-2">
        Status: {job.status}
      </p>

      <p className="text-gray-500 mb-8">
        Created: {job.createdAt.toLocaleDateString()}
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="bg-gray-500 text-white px-5 py-2 rounded"
        >
          Back
        </Link>

        <Link
          href={`/jobs/${job.id}/edit`}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Edit Job
        </Link>

        <form action={deleteJob}>
          <button
            type="submit"
            className="bg-red-600 text-white px-5 py-2 rounded"
          >
            Delete Job
          </button>
        </form>
      </div>
    </main>
  );
}