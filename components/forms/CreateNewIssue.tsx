"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createNewIssueSchema } from "@/schemas";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { revalidatePath } from "next/cache";

export function CreateNewIssue() {
  const router = useRouter();

  const form = useForm<z.infer<typeof createNewIssueSchema>>({
    resolver: zodResolver(createNewIssueSchema),
    // reValidateMode: "onBlur",
    // defaultValues: {
    //   title: "",
    //   description: "",
    // },
  });

  const {
    formState: { isSubmitting, isDirty, dirtyFields, isSubmitted, isValid },
    reset,
  } = form;

  async function onSubmit(values: z.infer<typeof createNewIssueSchema>) {
    try {
      const response = await fetch("/api/issues", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        // reset();
        toast.success("Issue created successfully");

        router.push("/issues");
      } else if (response.status === 401) {
        toast.error("Not authenticated");
      } else {
        toast.error("Error creating issue");
      }
    } catch (error) {
      // Handle network error
      console.error("Network error occurred", error);
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

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Creating issue..." : "Create new issue"}
        </Button>
      </form>
    </Form>
  );
}
