import prisma from "@/lib/prisma";
import { UpdateIssueSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const body = await req.json();

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
}
