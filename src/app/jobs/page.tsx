import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { JobStatus } from "@prisma/client";

interface JobsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function JobsPage({
  searchParams,
}: JobsPageProps) {
  const { search, status } = await searchParams;

  const jobs = await prisma.job.findMany({
    where: {
      ...(search
        ? {
            title: {
              contains: search,
              mode: "insensitive" as const,
            },
          }
        : {}),
      ...(status && status !== "ALL"
        ? {
            status: status as JobStatus,
          }
        : {}),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">

          <div>
            <h1 className="text-4xl font-bold">
              Jobs
            </h1>

            <p className="text-gray-500 mt-1">
              Manage job openings and recruitment positions
            </p>
          </div>

          <Link
            href="/jobs/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
          >
            ➕ Add Job
          </Link>

        </div>

        {/* Search & Filter */}

        <div className="bg-white rounded-xl shadow border p-6 mb-8">

          <form className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="search"
              defaultValue={search ?? ""}
              placeholder="Search jobs..."
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="status"
              defaultValue={status ?? "ALL"}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Jobs</option>
              <option value="OPEN">Open</option>
              <option value="CLOSED">Closed</option>
              <option value="DRAFT">Draft</option>
            </select>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl shadow transition"
              >
                Apply Filters
              </button>
            </div>

          </form>

        </div>

        {/* Jobs */}

        {jobs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">

  <h2 className="text-2xl font-bold">
    📂 No Jobs Found
  </h2>

  <p className="text-gray-500 mt-3">
    Create your first job opening to start hiring.
  </p>

  <Link
    href="/jobs/new"
    className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    Add Job
  </Link>

</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <h2 className="text-2xl font-bold">
                  {job.title}
                </h2>

                <p className="text-gray-600 mt-3 line-clamp-3">
                  {job.description}
                </p>

                <div className="mt-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      job.status === "OPEN"
                        ? "bg-green-100 text-green-700"
                        : job.status === "CLOSED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {job.status}
                  </span>

                </div>

                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
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