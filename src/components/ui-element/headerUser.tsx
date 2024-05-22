"use client"
import { auth } from "@/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export default function HeaderUser() {
  const [user, loading, error] = useAuthState(auth);
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
          <DropdownMenuContent>
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
