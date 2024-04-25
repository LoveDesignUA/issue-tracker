import { z } from "zod";

export const issueStatuses = ["OPEN", "IN_PROGRESS", "CLOSED"] as const;

export const createNewIssueSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export const UpdateIssueSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .optional(),
  status: z.enum(issueStatuses).optional(),
  assignedToUserId: z.string().min(10).optional().nullable(),
});
