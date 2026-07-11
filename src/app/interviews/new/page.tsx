"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Candidate {
  id: string;
  name: string;
  job: {
    title: string;
  };
}

export default function NewInterviewPage() {
  const router = useRouter();

  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidateId, setCandidateId] = useState("");
  const [scheduledAt, setScheduledAt] = useState("");
  const [type, setType] = useState("PHONE");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function loadCandidates() {
      const res = await fetch("/api/candidates");
      const data = await res.json();

      setCandidates(data);

      if (data.length > 0) {
        setCandidateId(data[0].id);
      }
    }

    loadCandidates();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/interviews", {
      method: "POST",
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
      alert("Interview scheduled successfully!");
      router.push("/interviews");
    } else {
      alert("Failed to schedule interview.");
    }
  }

  return (
    <main className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Schedule Interview
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
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="PHONE">Phone</option>
          <option value="TECHNICAL">Technical</option>
          <option value="HR">HR</option>
          <option value="FINAL">Final</option>
        </select>

        <textarea
          placeholder="Feedback (optional)"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full border p-3 rounded"
          rows={4}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Schedule Interview
        </button>

      </form>
    </main>
  );
}