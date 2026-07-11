import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">
        HireTrack
      </h1>

      <nav className="flex flex-col gap-4">

        <Link
          href="/"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Dashboard
        </Link>

        <Link
          href="/jobs"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Jobs
        </Link>

        <Link
          href="/candidates"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Candidates
        </Link>

        <Link
          href="/jobs/new"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Add Job
        </Link>

        <Link
          href="/candidates/new"
          className="hover:bg-slate-700 p-3 rounded"
        >
          Add Candidate
        </Link>

      </nav>
    </aside>
  );
}