import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { CandidateStatus } from "@prisma/client";

export default async function NewCandidatePage() {
  const jobs = await prisma.job.findMany({
    orderBy: {
      title: "asc",
    },
  });

  async function createCandidate(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const about = formData.get("about") as string;
    const status = formData.get("status") as CandidateStatus;
    const jobId = formData.get("jobId") as string;

    await prisma.candidate.create({
      data: {
        name,
        email,
        phone,
        about,
        status,
        jobId,
      },
    });

    redirect("/candidates");
  }

  return (
    <main className="max-w-2xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-8">
        Add Candidate
      </h1>

      <form action={createCandidate} className="space-y-6">

        <div>
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            name="name"
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            type="email"
            name="email"
            required
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Phone
          </label>

          <input
            name="phone"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Tell Me About Yourself
          </label>

          <textarea
            name="about"
            rows={5}
            className="w-full border rounded p-2"
            placeholder="Write a short professional summary..."
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            name="status"
            className="w-full border rounded p-2"
            defaultValue={CandidateStatus.APPLIED}
          >
            <option value={CandidateStatus.APPLIED}>
              APPLIED
            </option>
            <option value={CandidateStatus.SCREENING}>
              SCREENING
            </option>
            <option value={CandidateStatus.INTERVIEW}>
              INTERVIEW
            </option>
            <option value={CandidateStatus.OFFER}>
              OFFER
            </option>
            <option value={CandidateStatus.REJECTED}>
              REJECTED
            </option>
            <option value={CandidateStatus.HIRED}>
              HIRED
            </option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Job
          </label>

          <select
            name="jobId"
            required
            className="w-full border rounded p-2"
          >
            <option value="">Select a Job</option>

            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title}
              </option>
            ))}
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            Create Candidate
          </button>

          <Link
            href="/candidates"
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </Link>
        </div>

      </form>
    </main>
  );
}