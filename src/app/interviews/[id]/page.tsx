import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import DeleteInterviewButton from "./DeleteInterviewButton";

interface InterviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function InterviewPage({
  params,
}: InterviewPageProps) {
  const { id } = await params;

  const interview = await prisma.interview.findUnique({
    where: {
      id,
    },
    include: {
      candidate: {
        include: {
          job: true,
        },
      },
    },
  });

  if (!interview) {
    notFound();
  }

  return (
    <main className="max-w-2xl mx-auto p-10">
      <Link
        href="/interviews"
        className="text-blue-600"
      >
        ← Back
      </Link>

      <div className="border rounded-lg p-8 mt-6 shadow">
        <h1 className="text-4xl font-bold mb-6">
          Interview Details
        </h1>

        <p className="mb-3">
          <strong>Candidate:</strong>{" "}
          {interview.candidate.name}
        </p>

        <p className="mb-3">
          <strong>Job:</strong>{" "}
          {interview.candidate.job.title}
        </p>

        <p className="mb-3">
          <strong>Interview Type:</strong>{" "}
          {interview.type}
        </p>

        <p className="mb-3">
          <strong>Scheduled At:</strong>{" "}
          {new Date(
            interview.scheduledAt
          ).toLocaleString()}
        </p>

        <p className="mb-6">
          <strong>Feedback:</strong>{" "}
          {interview.feedback || "No feedback"}
        </p>

        <div className="flex gap-4">
          <Link
            href={`/interviews/${interview.id}/edit`}
            className="bg-blue-600 text-white px-5 py-2 rounded"
          >
            Edit Interview
          </Link>

          <DeleteInterviewButton id={interview.id} />
        </div>
      </div>
    </main>
  );
}