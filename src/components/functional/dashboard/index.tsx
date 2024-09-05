"use client";

import Loading from "@/app/loading";
import { auth, db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { StallInfo } from "@/types/stallInfo";
import { ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { SalesSheet } from "./salesSheet";
import { StockSheet } from "./stockSheet";

export default function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [stalls, stallsLoading, stallsError] = useObjectVal<{
    [key: string]: StallInfo;
  }>(ref(db, "stalls"));
  useError(error, stallsError);
  if (loading || stallsLoading) return <Loading />;
  return (
    <>
      <h1 className="text-2xl">ダッシュボード</h1>
      <SalesSheet stalls={stalls!} />

      {/* 在庫が少ない商品リスト */}
      <StockSheet stalls={stalls!} />
      {/* 放置されている注文 */}
    </>
  );
}
