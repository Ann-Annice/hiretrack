import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(jobs);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get the first user from the database
    const user = await prisma.user.findFirst();

    if (!user) {
      return NextResponse.json(
        { message: "No user found. Please create a user first." },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title: body.title,
        description: body.description,
        status: body.status,
        ownerId: user.id,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 500 }
    );
  }
}