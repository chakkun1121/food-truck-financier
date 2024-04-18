"use client";

import Header from "@/components/ui-element/header";
import { auth, db } from "@/firebase";
import { ref } from "firebase/database";
import {
  useAuthState,
  useUpdateEmail,
  useUpdatePassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";

export default function UserPage() {
  const [user, loading, error] = useAuthState(auth);

  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallInfo, stallInfoLoading, stallInfoError] = useObjectVal<{
    name?: string;
  }>(ref(db, `stalls/${userInfo?.stallId}`));

  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto">
        {loading || userInfoLoading || stallInfoLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className="text-3xl">ユーザー情報</h1>
            <p>メールアドレス: {user?.email}</p>
            <p>名前: {user?.displayName}</p>
            <h2 className="text-2xl">所属屋台情報</h2>
            <p>屋台名: {stallInfo?.name}</p>
          </>
        )}
      </main>
    </>
  );
}
