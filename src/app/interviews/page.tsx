import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { InterviewType } from "@prisma/client";

interface InterviewsPageProps {
  searchParams: Promise<{
    search?: string;
    type?: string;
  }>;
}

export default async function InterviewsPage({
  searchParams,
}: InterviewsPageProps) {
  const { search, type } = await searchParams;

  const interviews = await prisma.interview.findMany({
    where: {
      ...(search
        ? {
            candidate: {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          }
        : {}),
      ...(type && type !== "ALL"
        ? {
            type: type as InterviewType,
          }
        : {}),
    },
    include: {
      candidate: {
        include: {
          job: true,
        },
      },
    },
    orderBy: {
      scheduledAt: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">

          <div>
            <h1 className="text-4xl font-bold">
              Interviews
            </h1>

            <p className="text-gray-500 mt-1">
              Manage interview schedules and candidate progress
            </p>
          </div>

          <Link
            href="/interviews/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow transition"
          >
            📅 Schedule Interview
          </Link>

        </div>

        {/* Search & Filter */}

        <div className="bg-white rounded-xl shadow border p-6 mb-8">

          <form className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="search"
              defaultValue={search ?? ""}
              placeholder="Search candidate..."
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <select
              name="type"
              defaultValue={type ?? "ALL"}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="ALL">All Interview Types</option>
              <option value="PHONE">Phone</option>
              <option value="TECHNICAL">Technical</option>
              <option value="HR">HR</option>
              <option value="FINAL">Final</option>
            </select>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl shadow transition"
              >
                Apply Filters
              </button>
            </div>

          </form>

        </div>

        {/* Interview Cards */}

        {interviews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">

  <h2 className="text-2xl font-bold">
    📅 No Interviews Scheduled
  </h2>

  <p className="text-gray-500 mt-3">
    Schedule an interview to start the hiring process.
  </p>

  <Link
    href="/interviews/new"
    className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
  >
    Schedule Interview
  </Link>

</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {interviews.map((interview) => (
              <div
                key={interview.id}
                className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >

                <h2 className="text-2xl font-bold">
                  {interview.candidate.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">
                    Position:
                  </span>{" "}
                  {interview.candidate.job.title}
                </p>

                <p className="text-gray-600 mt-2">
                  <span className="font-semibold">
                    Scheduled:
                  </span>
                  <br />
                  {new Date(interview.scheduledAt).toLocaleString()}
                </p>

                <div className="mt-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      interview.type === "PHONE"
                        ? "bg-blue-100 text-blue-700"
                        : interview.type === "TECHNICAL"
                        ? "bg-purple-100 text-purple-700"
                        : interview.type === "HR"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {interview.type}
                  </span>

                </div>

                <Link
                  href={`/interviews/${interview.id}`}
                  className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition"
                >
                  View Details
                </Link>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}