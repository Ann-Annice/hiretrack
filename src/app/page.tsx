import Link from "next/link";
import { prisma } from "@/app/lib/prisma";

export default async function Dashboard() {
  const totalJobs = await prisma.job.count();

  const openJobs = await prisma.job.count({
    where: {
      status: "OPEN",
    },
  });

  const totalCandidates = await prisma.candidate.count();

  const hiredCandidates = await prisma.candidate.count({
    where: {
      status: "HIRED",
    },
  });

  const totalInterviews = await prisma.interview.count();

  const recentJobs = await prisma.job.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const recentCandidates = await prisma.candidate.findMany({
    include: {
      job: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  const recentInterviews = await prisma.interview.findMany({
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
    take: 5,
  });

  return (
    <main className="min-h-screen bg-gray-100 max-w-7xl mx-auto p-10">
      {/* Dashboard Header */}

<div className="mb-10 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 rounded-3xl p-8 shadow-xl text-white">

  <p className="uppercase tracking-[0.3em] text-sm text-blue-100 font-semibold">
   Manage.Hire.Grow
  </p>

  
</div>

      {/* Statistics Cards */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
    <p className="text-sm uppercase tracking-wide opacity-90">
      Total Jobs
    </p>

    <h2 className="text-4xl font-bold mt-3">
      {totalJobs}
    </h2>
  </div>

  <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
    <p className="text-sm uppercase tracking-wide opacity-90">
      Open Jobs
    </p>

    <h2 className="text-4xl font-bold mt-3">
      {openJobs}
    </h2>
  </div>

  <div className="bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
    <p className="text-sm uppercase tracking-wide opacity-90">
      Candidates
    </p>

    <h2 className="text-4xl font-bold mt-3">
      {totalCandidates}
    </h2>
  </div>

  <div className="bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-2xl shadow-lg p-6 hover:scale-105 transition duration-300">
    <p className="text-sm uppercase tracking-wide opacity-90">
      Hired
    </p>

    <h2 className="text-4xl font-bold mt-3">
      {hiredCandidates}
    </h2>
  </div>

</div>

      <div className="mt-10 flex flex-wrap gap-4">

  <Link
    href="/jobs"
    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow transition"
  >
    📂 View Jobs
  </Link>

  <Link
    href="/candidates"
    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl shadow transition"
  >
    👥 View Candidates
  </Link>

  <Link
    href="/interviews"
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow transition"
  >
    📅 View Interviews
  </Link>

  <Link
    href="/jobs/new"
    className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl shadow transition"
  >
    ➕ Add Job
  </Link>

</div>

      {/* Recent Jobs */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Recent Jobs
        </h2>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Title</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentJobs.map((job) => (
                <tr key={job.id} className="border-t">
                  <td className="p-4">
                    <Link
                      href={`/jobs/${job.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {job.title}
                    </Link>
                  </td>

                  <td className="p-4">
                    {job.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Candidates */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Recent Candidates
        </h2>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Job</th>
                <th className="text-left p-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {recentCandidates.map((candidate) => (
                <tr key={candidate.id} className="border-t">
                  <td className="p-4">
                    <Link
                      href={`/candidates/${candidate.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      {candidate.name}
                    </Link>
                  </td>

                  <td className="p-4">
                    {candidate.job.title}
                  </td>

                  <td className="p-4">
                    {candidate.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Upcoming Interviews */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">
          Upcoming Interviews
        </h2>

        <div className="bg-white rounded-xl shadow border overflow-hidden">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-50 text-gray-700 uppercase text-sm">
              <tr className="border-t hover:bg-gray-50 transition-colors">
                <th className="text-left p-4">Candidate</th>
                <th className="text-left p-4">Job</th>
                <th className="text-left p-4">Type</th>
                <th className="text-left p-4">Scheduled At</th>
              </tr>
            </thead>

            <tbody>
              {recentInterviews.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center p-6 text-gray-500"
                  >
                    No interviews scheduled.
                  </td>
                </tr>
              ) : (
                recentInterviews.map((interview) => (
                  <tr key={interview.id} className="border-t">
                    <td className="p-4">
                      <Link
                        href={`/interviews/${interview.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {interview.candidate.name}
                      </Link>
                    </td>

                    <td className="p-4">
                      {interview.candidate.job.title}
                    </td>

                    <td className="p-4">
                      {interview.type}
                    </td>

                    <td className="p-4">
                      {new Date(
                        interview.scheduledAt
                      ).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    </main>
  );
}