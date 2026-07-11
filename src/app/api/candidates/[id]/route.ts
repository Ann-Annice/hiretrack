import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

type RouteProps = {
  params: Promise<{
    id: string;
  }>;
};

// GET Candidate
export async function GET(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    const candidate = await prisma.candidate.findUnique({
      where: {
        id,
      },
      include: {
        job: true,
      },
    });

    if (!candidate) {
      return NextResponse.json(
        { message: "Candidate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(candidate);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to fetch candidate" },
      { status: 500 }
    );
  }
}

// UPDATE Candidate
export async function PUT(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const candidate = await prisma.candidate.update({
      where: {
        id,
      },
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

    return NextResponse.json(candidate);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to update candidate" },
      { status: 500 }
    );
  }
}

// DELETE Candidate
export async function DELETE(
  request: Request,
  { params }: RouteProps
) {
  try {
    const { id } = await params;

    await prisma.candidate.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Candidate deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to delete candidate" },
      { status: 500 }
    );
  }
}