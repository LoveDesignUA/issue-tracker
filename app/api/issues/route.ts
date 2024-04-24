import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { createNewIssueSchema } from "@/schemas";
import { NextRequest, NextResponse } from "next/server";

export const POST = auth(async function POST(req: NextRequest) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  const body = await req.json();

  const validatedBody = createNewIssueSchema.safeParse(body);

  if (!validatedBody.success) {
    return NextResponse.json(validatedBody.error.errors, {
      status: 400,
    });
  }

  try {
    const newIssue = await prisma.issue.create({
      data: validatedBody.data,
    });

    return NextResponse.json(newIssue, { status: 201 });
  } catch (error) {
    console.error("Error creating issue: ", error);
  }
});
