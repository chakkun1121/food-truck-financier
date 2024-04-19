"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AccessError() {
  return (
    <div className="text-center">
      <h2>正しいユーザーでログインするか管理者へお問い合わせください。</h2>
      <Button asChild>
        <Link href="/logout">ログアウト</Link>
      </Button>
    </div>
  );
}
