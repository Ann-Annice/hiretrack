import { prisma } from "@/app/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

interface CandidatePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function CandidatePage({
  params,
}: CandidatePageProps) {
  const { id } = await params;

  const candidate = await prisma.candidate.findUnique({
    where: {
      id,
    },
    include: {
      job: true,
      interviews: {
        orderBy: {
          scheduledAt: "asc",
        },
      },
    },
  });

  if (!candidate) {
    notFound();
  }

  async function deleteCandidate() {
    "use server";

    await prisma.candidate.delete({
      where: {
        id,
      },
    });

    redirect("/candidates");
  }

  return (
    <main className="max-w-5xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">
        Candidate Details
      </h1>

      <div className="bg-white shadow rounded-lg p-8 border">

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="font-semibold">Name</p>
            <p>{candidate.name}</p>
          </div>

          <div>
            <p className="font-semibold">Email</p>
            <p>{candidate.email}</p>
          </div>

          <div>
            <p className="font-semibold">Phone</p>
            <p>{candidate.phone || "Not provided"}</p>
          </div>

          <div>
            <p className="font-semibold">Applied Job</p>
            <p>{candidate.job.title}</p>
          </div>

          <div>
            <p className="font-semibold">Status</p>

            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${
                candidate.status === "APPLIED"
                  ? "bg-blue-500"
                  : candidate.status === "SCREENING"
                  ? "bg-yellow-500"
                  : candidate.status === "INTERVIEW"
                  ? "bg-purple-500"
                  : candidate.status === "OFFER"
                  ? "bg-indigo-500"
                  : candidate.status === "HIRED"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {candidate.status}
            </span>
          </div>

          <div>
            <p className="font-semibold">Created On</p>

            <p>
              {candidate.createdAt.toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* About Candidate */}

        <div className="mt-8">
          <p className="font-semibold text-lg mb-2">
            Tell Me About Yourself
          </p>

          <div className="border rounded-lg bg-gray-50 p-4">
            {candidate.about ? (
              <p className="whitespace-pre-line">
                {candidate.about}
              </p>
            ) : (
              <p className="text-gray-500">
                No information provided.
              </p>
            )}
          </div>
        </div>

        <hr className="my-8" />

        <h2 className="text-2xl font-bold mb-4">
          Scheduled Interviews
        </h2>

        {candidate.interviews.length === 0 ? (
          <p className="text-gray-500">
            No interviews scheduled.
          </p>
        ) : (
          <table className="w-full border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Scheduled At</th>
                <th className="p-3 text-left">Feedback</th>
              </tr>
            </thead>

            <tbody>
              {candidate.interviews.map((interview) => (
                <tr
                  key={interview.id}
                  className="border-t"
                >
                  <td className="p-3">
                    {interview.type}
                  </td>

                  <td className="p-3">
                    {new Date(
                      interview.scheduledAt
                    ).toLocaleString()}
                  </td>

                  <td className="p-3">
                    {interview.feedback || "No feedback"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="flex gap-4 mt-8">

          <Link
            href="/candidates"
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Back
          </Link>

          <Link
            href={`/candidates/${candidate.id}/edit`}
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </Link>

          <form action={deleteCandidate}>
            <button
              type="submit"
              className="bg-red-600 text-white px-5 py-2 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </form>

        </div>
      </div>
    </main>
  );
}