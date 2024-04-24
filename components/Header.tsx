"use client";

import { cn } from "@/lib/utils";
import { Bug, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import PulseLoader from "react-spinners/PulseLoader";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/issues", label: "Issues" },
];

export default function Header() {
  const pathname = usePathname();
  const { data, status } = useSession();

  return (
    <nav className="container py-4 flex items-center justify-between gap-6 border-b">
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

      <div>
        {status === "authenticated" ? (
          <Button className="w-[112px]" variant="outline" asChild>
            <Link href="/api/auth/signout" onClick={() => signOut()}>
              <LogIn className="size-3.5 mr-2" />
              Sign out
            </Link>
          </Button>
        ) : status === "loading" ? (
          <Button className="w-[112px]" variant="outline">
            <PulseLoader size={8} />
          </Button>
        ) : (
          <Button className="w-[112px]" variant="outline" asChild>
            <Link href="/api/auth/signin" onClick={() => signIn()}>
              <LogOut className="size-3.5 mr-2" />
              Sign in
            </Link>
          </Button>
        )}
      </div>
    </nav>
  );
}
