"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut, User } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function UserButton() {
  const { data, status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={data.user!.image!} />
              <AvatarFallback>
                <User />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>{data.user!.email}</DropdownMenuItem>
            <DropdownMenuItem>
              <Button className="cursor-pointer" variant="default" asChild>
                <Link href="/api/auth/signout" onClick={() => signOut()}>
                  <LogIn className="size-3.5 mr-2" />
                  Sign out
                </Link>
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button variant="outline" asChild>
          <Link href="/api/auth/signin" onClick={() => signIn()}>
            <LogOut className="size-3.5 mr-2" />
            Sign in
          </Link>
        </Button>
      )}
    </div>
  );
}
