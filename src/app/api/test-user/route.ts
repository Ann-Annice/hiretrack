import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  const existingUser = await prisma.user.findFirst();

  if (existingUser) {
    return NextResponse.json(existingUser);
  }

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: "test@example.com",
      password: "123456",
      role: "RECRUITER",
    },
  });

  return NextResponse.json(user);
}