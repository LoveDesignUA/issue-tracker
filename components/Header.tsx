"use client";

import { cn } from "@/lib/utils";
import { Bug } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import UserButton from "./UserButton";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <nav className="container py-4 flex items-center justify-between gap-6 border-b">
      {/* Nav links */}
      <div className="flex irems-center gap-6">
        <Link href="/">
          <Bug />
        </Link>

        <ul className="flex gap-6">
          {links.map(({ href, label }) => (
            <li key={label}>
              <Link
                href={href}
                className={cn("font-medium text-foreground/75", {
                  "font-semibold text-foreground": href === pathname,
                })}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Dropdown menu */}
      <UserButton />
    </nav>
  );
}
