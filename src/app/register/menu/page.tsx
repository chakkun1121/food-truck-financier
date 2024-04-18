"use client";
import Loading from "@/components/ui-element/loading";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/firebase";
import { ref } from "firebase/database";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
export default function RegisterPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallInfo, stallInfoLoading, stallInfoError] = useObjectVal<{
    name?: string;
  }>(ref(db, `stalls/${userInfo?.stallId}`));
  if (loading || userInfoLoading || stallInfoLoading) return <Loading />;
  if (!user || !stallInfo)
    return (
      <div className="text-center">
        <h2>正しいユーザーでログインするか管理者へお問い合わせください。</h2>
        <Button asChild>
          <Link href="/logout">ログアウト</Link>
        </Button>
      </div>
    );
  return <></>;
}
