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
import { Button } from "@/components/ui/button";
import { convertCsv } from "@/app/register/orders/convertCsv";
// @ts-ignore
import { zip, dl } from "@/lib/zip";
import { useState } from "react";
import { toast } from "sonner";

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
      <Export stalls={stalls!} />
    </>
  );
}
function Export({ stalls }: { stalls: { [key: string]: StallInfo } }) {
  const [loading, setLoading] = useState(false);
  async function download() {
    try {
      setLoading(true);
      const data = Object.entries(stalls).map(([stallId, stall]) => ({
        id: stallId,
        name: stall.name,
        csv: convertCsv(stall?.commodities, stall?.orders!),
      }));
      const files = data.map(d => ({
        name: `${d.name}.csv`,
        buffer: new TextEncoder().encode(d.csv),
      }));
      dl({ name: "stalls.zip", buffer: await zip(files) });
    } catch (e: any) {
      console.error(e);
      toast.error(`エクスポートに失敗しました: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Button onClick={() => download()} disabled={loading}>
      データをエクスポート
    </Button>
  );
}
