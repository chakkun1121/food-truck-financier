"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { auth } from "@/firebase";
import { useError } from "@/hooks/useError";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
export default function HeaderUser() {
  const [user, loading, error] = useAuthState(auth);
  useError(error);
  return (
    <>
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <>
              <p>{user?.displayName}</p>
              <p>{user?.email}</p>
            </>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Link href="/user" prefetch={false}>
                ユーザー情報
              </Link>
            </DropdownMenuItem>
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
    </>
  );
}
