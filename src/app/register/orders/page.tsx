"use client";

import AccessError from "@/components/accessError";
import OrderCard from "@/components/functional/register/orders/orderCard";
import Loading from "@/components/ui-element/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { OrderType, StallInfo } from "@/types/stallInfo";
import { CheckIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";

export default function OrdersPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: UUID;
  }>(ref(db, `users/${user?.uid}`));
  const [commodities, commoditiesLoading, commoditiesError] = useObjectVal<
    StallInfo["commodities"]
  >(ref(db, `stalls/${userInfo?.stallId}/commodities`));
  const [orders, ordersLoading, ordersError] = useObjectVal<{
    [key: UUID]: OrderType;
  }>(ref(db, `stalls/${userInfo?.stallId}/orders`));
  const [orderStatus, setOrderStatus] = useState<
    "all" | "pending" | "completed" | "cancelled"
  >("pending");
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
        <Select
          value={orderStatus}
          onValueChange={(v: any) => setOrderStatus(v)}
        >
          <SelectTrigger className="w-24">
            <SelectValue placeholder="絞り込み" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">すべて</SelectItem>
            <SelectItem value="pending">未完了</SelectItem>
            <SelectItem value="completed">完了</SelectItem>
            <SelectItem value="cancelled">キャンセル</SelectItem>
          </SelectContent>
        </Select>
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
            ([id, order]: [id: UUID, order: OrderType], index) => (
              <OrderCard
                key={id}
                order={{ ...order, id, index }}
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
