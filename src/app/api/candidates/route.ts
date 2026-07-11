import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        job: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(candidates);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch candidates" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const candidate = await prisma.candidate.create({
      data: {
  name: body.name,
  email: body.email,
  phone: body.phone,
  about: body.about,
  status: body.status,
  jobId: body.jobId,
},
      include: {
        job: true,
      },
    });

    return NextResponse.json(candidate, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create candidate" },
      { status: 500 }
    );
  }
}