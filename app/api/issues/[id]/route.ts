import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { UpdateIssueSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = auth(async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  // If user doesn't exist, return 404
  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 404 });
    }
  }

  const validatedBody = UpdateIssueSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.errors, {
      status: 400,
    });
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: { id },
    });

    if (!issue) {
      return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
      where: {
        id,
      },
      data: validatedBody.data,
    });

    return NextResponse.json(updatedIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue: ", error);
  }
});

export const DELETE = auth(async function DELETE(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: { id },
    });

    if (!issue) {
      return NextResponse.json({ error: "Invalid issue" }, { status: 404 });
    }

    await prisma.issue.delete({
      where: { id },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting issue: ", error);
  }
});
