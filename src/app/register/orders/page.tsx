"use client";

import AccessError from "@/components/accessError";
import OrderCard from "@/components/functional/register/orders/orderCard";
import Loading from "@/components/ui-element/loading";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { auth, db } from "@/firebase";
import { UUIDv7GetTimestamp } from "@/lib/uuidv7-get-timestamp";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";

export default function OrdersPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));

  const [commodities, commoditiesLoading, commoditiesError] = useObjectVal<
    StallInfo["commodities"]
  >(ref(db, `stalls/${userInfo?.stallId}/commodities`));
  const [orders, ordersLoading, ordersError] = useObjectVal<{
    [key: UUID]: OrderType;
  }>(ref(db, `stalls/${userInfo?.stallId}/orders`));
  const [orderStatus, setOrderStatus] = useState<
    "all" | "pending" | "ready" | "completed" | "cancelled"
  >("pending");
  function exportCsv() {
    // 注文番号 合計金額 注文日時 受取日時 ステータス
    const csv = [
      ["注文番号", "合計金額", "注文日時", "受取日時", "ステータス"],
      // @ts-ignore
      ...Object.entries(orders)
        // @ts-ignore
        .map(([id, order]: [id: UUID, order: OrderType]) =>
          [
            order.ticket,
         
            new Date(UUIDv7GetTimestamp(id)).toLocaleString(),
            "",
            order.status,
          ].join(",")
        ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders.csv";
    a.click();
    URL.revokeObjectURL(url);
  }
  if (
    loading ||
    userInfoLoading ||
    ordersLoading ||
    commoditiesLoading ||
    !orders
  )
    return <Loading />;
  if (!user || !userInfo?.stallId) return <AccessError />;
  return (
    <>
      <div className="flex justify-between p-4">
        <h2>注文情報</h2>
        <div className="flex fixed right-0">
          <Select
            value={orderStatus}
            onValueChange={(v: any) => setOrderStatus(v)}>
            <SelectTrigger className="w-36 bg-background">
              <SelectValue placeholder="絞り込み" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">すべて</SelectItem>
              <SelectItem value="pending">未完了</SelectItem>
              <SelectItem value="ready">準備完了(未受取)</SelectItem>
              <SelectItem value="completed">完了</SelectItem>
              <SelectItem value="cancelled">キャンセル</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild aria-label="More options">
              <Button variant="ghost">
                <DotsVerticalIcon />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={exportCsv}>
                エクスポート
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        {Object.entries(orders)
          .reverse()
          // @ts-ignore
          .filter(([_, o]: [_: any, o: OrderType]) => {
            if (orderStatus == "all") return true;
            return o.status == orderStatus;
          })
          .map(
            // @ts-ignore // なぜかidがstringとなるため踏み倒す
            ([id, order]: [id: UUID, order: OrderType]) => (
              <OrderCard
                key={id}
                order={{ ...order, id }}
                commodities={commodities}
                setOrderState={(status: OrderType["status"]) => {
                  set(
                    ref(db, `stalls/${userInfo.stallId}/orders/${id}/status`),
                    status
                  );
                }}
              />
            )
          )}
      </div>
    </>
  );
}
