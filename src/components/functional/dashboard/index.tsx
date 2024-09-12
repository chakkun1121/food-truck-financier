"use client";

import Loading from "@/app/loading";
import { db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { StallInfo } from "@/types/stallInfo";
import { ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import Export from "./export";
import { SalesSheet } from "./salesSheet";
import { StockSheet } from "./stockSheet";

export default function Dashboard() {
  const [stalls, stallsLoading, stallsError] = useObjectVal<{
    [key: string]: StallInfo;
  }>(ref(db, "stalls"));
  useError(stallsError);
  if (stallsLoading) return <Loading />;
  return (
    <>
      <h1 className="text-2xl">ダッシュボード</h1>
      <SalesSheet stalls={stalls!} />
      <StockSheet stalls={stalls!} />
      <Export stalls={stalls!} />
    </>
  );
}
