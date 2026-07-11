"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Candidate {
  id: string;
  name: string;
  job: {
    title: string;
  };
}

export default function EditInterviewPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidateId, setCandidateId] = useState("");

  const [scheduledAt, setScheduledAt] = useState("");
  const [type, setType] = useState("PHONE");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function loadData() {
      const interviewRes = await fetch(`/api/interviews/${id}`);
      const interview = await interviewRes.json();

      const candidatesRes = await fetch("/api/candidates");
      const candidates = await candidatesRes.json();

      setCandidates(candidates);

      setCandidateId(interview.candidateId);

      const date = new Date(interview.scheduledAt);
      const formatted =
        new Date(date.getTime() - date.getTimezoneOffset() * 60000)
          .toISOString()
          .slice(0, 16);

      setScheduledAt(formatted);
      setType(interview.type);
      setFeedback(interview.feedback || "");

      setLoading(false);
    }

    loadData();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`/api/interviews/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidateId,
        scheduledAt,
        type,
        feedback,
      }),
    });

    if (response.ok) {
      alert("Interview updated successfully!");
      router.push(`/interviews/${id}`);
      router.refresh();
    } else {
      alert("Failed to update interview");
    }
  }

  if (loading) {
    return (
      <main className="max-w-xl mx-auto p-10">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit Interview
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <select
          value={candidateId}
          onChange={(e) => setCandidateId(e.target.value)}
          className="w-full border p-3 rounded"
        >
          {candidates.map((candidate) => (
            <option key={candidate.id} value={candidate.id}>
              {candidate.name} - {candidate.job.title}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="PHONE">PHONE</option>
          <option value="TECHNICAL">TECHNICAL</option>
          <option value="HR">HR</option>
          <option value="FINAL">FINAL</option>
        </select>

        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          rows={5}
          className="w-full border p-3 rounded"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded"
          >
            Update Interview
          </button>

          <button
            type="button"
            onClick={() => router.push(`/interviews/${id}`)}
            className="bg-gray-500 text-white px-6 py-3 rounded"
          >
            Cancel
          </button>
        </div>

      </form>
    </main>
  );
}