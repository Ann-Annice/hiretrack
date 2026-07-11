import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function GET() {
  try {
    const interviews = await prisma.interview.findMany({
      include: {
        candidate: {
          include: {
            job: true,
          },
        },
      },
      orderBy: {
        scheduledAt: "asc",
      },
    });

    return NextResponse.json(interviews);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const interview = await prisma.interview.create({
      data: {
        scheduledAt: new Date(body.scheduledAt),
        type: body.type,
        feedback: body.feedback,
        candidateId: body.candidateId,
      },
      include: {
        candidate: {
          include: {
            job: true,
          },
        },
      },
    });

    return NextResponse.json(interview, {
      status: 201,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to create interview" },
      { status: 500 }
    );
  }
}