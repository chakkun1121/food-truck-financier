"use client";

import { auth, db } from "@/firebase";
import { ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";

export default function UserPage() {
  const [user, loading, error] = useAuthState(auth);

  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallName, stallInfoLoading, stallInfoError] = useObjectVal<string>(
    ref(db, `stalls/${userInfo?.stallId}/name`)
  );

  return (
    <main className="max-w-4xl mx-auto">
      {loading || userInfoLoading || stallInfoLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className="text-3xl">ユーザー情報</h1>
          <p>
            メールアドレス: <span className="select-text">{user?.email}</span>
          </p>
          <p>
            名前: <span className="select-text">{user?.displayName}</span>
          </p>
          <h2 className="text-2xl">所属屋台情報</h2>
          <p>
            屋台名: <span className="select-text">{stallName}</span>
          </p>
        </>
      )}
    </main>
  );
}
