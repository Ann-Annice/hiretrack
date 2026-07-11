"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      const response = await fetch("/api/me");

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      }
    }

    loadUser();
  }, []);

  async function handleLogout() {
    const response = await fetch("/api/logout", {
      method: "POST",
    });

    if (response.ok) {
      router.push("/login");
      router.refresh();
    }
  }

  return (
    <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">

      {/* Left Side */}
      <div>
        <h1 className="text-2xl font-bold text-blue-700">
          HireTrack
        </h1>

        <p className="text-sm text-gray-500">
          Recruitment Management System
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {user && (
          <div className="text-right">
            <p className="font-semibold text-gray-800">
              👋 Welcome, {user.name}
            </p>

            <span
  className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
    user.role === "ADMIN"
      ? "bg-red-100 text-red-700"
      : user.role === "RECRUITER"
      ? "bg-blue-100 text-blue-700"
      : "bg-green-100 text-green-700"
  }`}
>
  {user.role === "ADMIN"
    ? "Administrator"
    : user.role === "RECRUITER"
    ? "Recruiter"
    : "Viewer"}
</span>
          </div>
        )}

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>

    </header>
  );
}