"use client";

import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <header className="flex justify-between items-center p-2">
      <h1 className="text-3xl">
        <Link href="/" prefetch={false}>
          FoodTruck Financier
        </Link>
      </h1>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <>
              <p>{user?.displayName}</p>
              <p>{user?.email}</p>
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>設定</DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/logout" prefetch={false}>
                ログアウト
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Button asChild disabled={loading}>
          <Link href="/login" prefetch={false}>
            ログイン
          </Link>
        </Button>
      )}
    </header>
  );
}
