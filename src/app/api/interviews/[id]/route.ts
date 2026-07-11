import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

// GET Interview
export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
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
      return NextResponse.json(
        { message: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(interview);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch interview" },
      { status: 500 }
    );
  }
}

// UPDATE Interview
export async function PUT(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const interview = await prisma.interview.update({
      where: {
        id,
      },
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

    return NextResponse.json(interview);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update interview" },
      { status: 500 }
    );
  }
}

// DELETE Interview
export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    await prisma.interview.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Interview deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete interview" },
      { status: 500 }
    );
  }
}