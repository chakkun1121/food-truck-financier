"use client";
import { auth, db } from "@/firebase";
import { ref } from "firebase/database";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import Loading from "./loading";
export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallName, stallInfoLoading, stallInfoError] = useObjectVal<string>(
    ref(db, `stalls/${userInfo?.stallId}/name`)
  );
  const router = useRouter();

  if (error || userInfoError || stallInfoError) {
    console.error("Error fetching data:", error, userInfoError, stallInfoError);
    return <p className="text-red-500">データの取得に失敗しました</p>;
  }

  return (
    <header className="bg-background bg-opacity-50 fixed inset-x-0 top-0 z-50 flex h-12 w-full items-center justify-between p-2">
      <h1
        className="text-2xl"
        onDoubleClick={() => router.push("/")}
        title="ダブルクリックでトップへ移動"
      >
        FoodTruck Financier
      </h1>
      <div>
        {loading || userInfoLoading || stallInfoLoading ? (
          <Loading className="text-start" />
        ) : stallName ? (
          <p>{stallName}</p>
        ) : (
          <p>未所属</p>
        )}
      </div>
    </header>
  );
}
