"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { ref } from "firebase/database";
import { useState } from "react";
import {
  useAuthState,
  useUpdatePassword,
  useUpdateProfile
} from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { toast } from "sonner";

export default function UserPage() {
  const [user, loading, error] = useAuthState(auth);

  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallName, stallInfoLoading, stallInfoError] = useObjectVal<string>(
    ref(db, `stalls/${userInfo?.stallId}/name`)
  );
  const [newUserName, setNewUserName] = useState(user?.displayName ?? "");
  const [newPassword, setNewPassword] = useState("");
  const [updateProfile, , updateProfileError] = useUpdateProfile(auth);
  const [updatePassword, , updatePasswordError] = useUpdatePassword(auth);
  const [updating, setUpdating] = useState(false);
  useError(
    error,
    userInfoError,
    stallInfoError,
    updateProfileError,
    updatePasswordError
  );
  return (
    <main className="mx-auto max-w-4xl">
      {loading || userInfoLoading || stallInfoLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          <form
            onSubmit={async e => {
              e.preventDefault();
              setUpdating(true);
              await updatePassword(newPassword);
              const success = await updateProfile({
                displayName: newUserName
              });
              setUpdating(false);
              if (success) {
                toast.success("更新しました");
              }
            }}
          >
            <h1 className="text-3xl">ユーザー情報</h1>
            <p>
              メールアドレス:
              <Input
                type="email"
                disabled
                value={user?.email ?? ""}
                autoComplete="username"
              />
            </p>
            <p>
              名前:
              <Input
                type="text"
                value={newUserName}
                onChange={e => setNewUserName(e.target.value)}
                autoComplete="name"
              />
            </p>

            <p>
              パスワード:
              <Input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                autoComplete="new-password"
              />
            </p>
            <Button type="submit" disabled={updating}>
              更新
            </Button>
          </form>

          <h2 className="text-2xl">所属屋台情報</h2>
          <p>
            屋台名: <span className="select-text">{stallName}</span>
          </p>
        </>
      )}
    </main>
  );
}
