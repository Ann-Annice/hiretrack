"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

type Job = {
  id: string;
  title: string;
};

export default function EditCandidatePage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id as string;

  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [jobId, setJobId] = useState("");

  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function loadData() {
      const candidateRes = await fetch(`/api/candidates/${id}`);
      const candidate = await candidateRes.json();

      const jobsRes = await fetch("/api/jobs");
      const jobsData = await jobsRes.json();

      setName(candidate.name);
      setEmail(candidate.email);
      setPhone(candidate.phone ?? "");
      setAbout(candidate.about ?? "");
      setStatus(candidate.status);
      setJobId(candidate.jobId);

      setJobs(jobsData);
      setLoading(false);
    }

    loadData();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch(`/api/candidates/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        about,
        status,
        jobId,
      }),
    });

    if (response.ok) {
      alert("Candidate updated successfully!");
      router.push(`/candidates/${id}`);
      router.refresh();
    } else {
      const error = await response.json();
      alert(error.message);
    }
  }

  if (loading) {
    return <p className="p-10">Loading...</p>;
  }

  return (
    <main className="max-w-xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit Candidate
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Candidate Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className="w-full border p-3 rounded"
        />

        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell me about yourself..."
          rows={5}
          className="w-full border p-3 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border p-3 rounded"
        >
          <option value="APPLIED">Applied</option>
          <option value="SCREENING">Screening</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
          <option value="HIRED">Hired</option>
        </select>

        <select
          value={jobId}
          onChange={(e) => setJobId(e.target.value)}
          className="w-full border p-3 rounded"
        >
          {jobs.map((job) => (
            <option key={job.id} value={job.id}>
              {job.title}
            </option>
          ))}
        </select>

        <div className="flex gap-4">

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          >
            Update Candidate
          </button>

          <button
            type="button"
            onClick={() => router.push(`/candidates/${id}`)}
            className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600"
          >
            Cancel
          </button>

        </div>

      </form>
    </main>
  );
}