import { CreateNewIssue } from "@/components/forms/CreateNewIssue";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Issue tracker | New issue",
  description: "Create a new issue in the issue tracker",
};

export default function NewIssuePage() {
  return (
    <div className="max-w-md mx-auto">
      <CreateNewIssue />
    </div>
  );
}
