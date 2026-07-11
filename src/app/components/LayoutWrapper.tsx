"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";
import Navbar from "./navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-8 bg-gray-100 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
}