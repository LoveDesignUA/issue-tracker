"use client";

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function IssuesBarChart({
  issuesCount,
}: {
  issuesCount: {
    Opened: number;
    "In progress": number;
    Closed: number;
  };
}) {
  const data = [
    {
      name: "Opened",
      uv: issuesCount.Opened,
    },
    {
      name: "In progress",
      uv: issuesCount["In progress"],
    },
    {
      name: "Closed",
      uv: issuesCount.Closed,
    },
  ];

  return (
    <ResponsiveContainer width="100%" height={360}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Bar dataKey="uv" barSize={80} className="fill-[var(--primary)]" />
      </BarChart>
    </ResponsiveContainer>
  );
}
