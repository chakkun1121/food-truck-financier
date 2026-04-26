"use client";

import Loading from "@/app/loading";
import { db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { StallInfo } from "@/types/stallInfo";
import { ref } from "firebase/database";
import { useObjectVal } from "react-firebase-hooks/database";
import Export from "./_components/export";
import { SalesSheet } from "./_components/salesSheet";
import { StockSheet } from "./_components/stockSheet";

export default function Dashboard() {
  const [stalls, stallsLoading, stallsError] = useObjectVal<
    | {
        [key: string]: Partial<StallInfo> | null | undefined;
      }
    | undefined
  >(ref(db, "stalls"));
  useError(stallsError);
  if (stallsLoading) return <Loading />;
  return (
    <>
      <h1 className="text-2xl">ダッシュボード</h1>
      <SalesSheet stalls={stalls} />
      <StockSheet stalls={stalls} />
      <Export stalls={stalls} />
    </>
  );
}
