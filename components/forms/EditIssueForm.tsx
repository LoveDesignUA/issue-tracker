"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UpdateIssueSchema, issueStatuses } from "@/schemas";
import { Issue, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditIssueForm({ issue }: { issue: Issue }) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);

  const form = useForm<z.infer<typeof UpdateIssueSchema>>({
    resolver: zodResolver(UpdateIssueSchema),
    defaultValues: {
      title: issue.title,
      description: issue.description,
      status: issue.status,
      assignedToUserId: issue.assignedToUserId ?? "",
    },
  });

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users");

      if (response.ok) {
        const users = await response.json();
        setUsers(users);
      }
    }

    fetchUsers();
  }, []);

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(values: z.infer<typeof UpdateIssueSchema>) {
    try {
      const response = await fetch(`/api/issues/${issue.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          assignedToUserId:
            values.assignedToUserId === "Unassigned"
              ? null
              : values.assignedToUserId,
        }),
      });

      if (response.ok) {
        // reset();
        toast.success("Issue updated successfully");

        router.push("/issues");
      } else if (response.status === 401) {
        toast.error("Not authenticated");
      } else {
        toast.error("Error updating issue");
      }
    } catch (error) {
      // Handle network error
      toast.error("Network error occurred");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status for the issue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {issueStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.toLowerCase().replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedToUserId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned to</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Unassigned">Unassigned</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Updating issue..." : "Edit issue"}
        </Button>
      </form>
    </Form>
  );
}
