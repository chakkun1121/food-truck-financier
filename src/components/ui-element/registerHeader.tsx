"use client";
import { auth, db } from "@/firebase";
import { ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import Loading from "./loading";
export default function Header() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallInfo, stallInfoLoading, stallInfoError] = useObjectVal<{
    name?: string;
  }>(ref(db, `stalls/${userInfo?.stallId}`));
  return (
    <header className="flex justify-between p-2 items-center">
      <h1 className="text-2xl">FoodTruck Financier</h1>
      <div>
        {loading || userInfoLoading || stallInfoLoading ? (
          <Loading className="text-start" />
        ) : stallInfo ? (
          <p>{stallInfo?.name}</p>
        ) : (
          <p>未所属</p>
        )}
      </div>
    </header>
  );
}
