import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { CandidateStatus } from "@prisma/client";

interface CandidatesPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
  }>;
}

export default async function CandidatesPage({
  searchParams,
}: CandidatesPageProps) {
  const { search, status } = await searchParams;

  const candidates = await prisma.candidate.findMany({
    where: {
      ...(search
        ? {
            OR: [
              {
                name: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
              {
                email: {
                  contains: search,
                  mode: "insensitive" as const,
                },
              },
            ],
          }
        : {}),
      ...(status && status !== "ALL"
        ? {
            status: status as CandidateStatus,
          }
        : {}),
    },
    include: {
      job: true,
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
              Candidates
            </h1>

            <p className="text-gray-500 mt-1">
              Manage applicants and track hiring progress
            </p>
          </div>

          <Link
            href="/candidates/new"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition"
          >
            ➕ Add Candidate
          </Link>

        </div>

        {/* Search */}

        <div className="bg-white rounded-xl shadow border p-6 mb-8">

          <form className="grid md:grid-cols-2 gap-4">

            <input
              type="text"
              name="search"
              defaultValue={search ?? ""}
              placeholder="Search by name or email..."
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="status"
              defaultValue={status ?? "ALL"}
              className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="ALL">All Candidates</option>
              <option value="APPLIED">Applied</option>
              <option value="SCREENING">Screening</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="HIRED">Hired</option>
              <option value="REJECTED">Rejected</option>
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

        {/* Candidates */}

        {candidates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-12 text-center">

  <h2 className="text-2xl font-bold">
    👤 No Candidates Found
  </h2>

  <p className="text-gray-500 mt-3">
    Add your first candidate to begin tracking applications.
  </p>

  <Link
    href="/candidates/new"
    className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
  >
    Add Candidate
  </Link>

</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl shadow-md border p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <h2 className="text-2xl font-bold">
                  {candidate.name}
                </h2>

                <p className="text-gray-600 mt-2">
                  {candidate.email}
                </p>

                <p className="text-gray-600">
                  {candidate.phone || "No phone number"}
                </p>

                <p className="mt-4">
                  <span className="font-semibold">
                    Applied For:
                  </span>{" "}
                  {candidate.job.title}
                </p>

                <div className="mt-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      candidate.status === "APPLIED"
                        ? "bg-blue-100 text-blue-700"
                        : candidate.status === "SCREENING"
                        ? "bg-yellow-100 text-yellow-700"
                        : candidate.status === "INTERVIEW"
                        ? "bg-purple-100 text-purple-700"
                        : candidate.status === "OFFER"
                        ? "bg-indigo-100 text-indigo-700"
                        : candidate.status === "HIRED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {candidate.status}
                  </span>

                </div>

                <Link
                  href={`/candidates/${candidate.id}`}
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