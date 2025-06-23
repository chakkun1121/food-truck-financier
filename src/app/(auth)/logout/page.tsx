"use client";

import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSignOut } from "react-firebase-hooks/auth";

export default function Logout() {
  const [signOut] = useSignOut(auth);
  const router = useRouter();
  useEffect(() => {
    signOut().then(() => {
      router.push("/login");
    });
  }, [signOut, router]);
  return <div>ログアウト中...</div>;
}
