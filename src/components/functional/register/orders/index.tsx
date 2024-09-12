"use client";

import AccessError from "@/components/accessError";
import OrderCard from "@/components/functional/register/orders/orderCard";
import Loading from "@/components/ui-element/loading";
import { auth, db } from "@/firebase";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { useError } from "@/hooks/useError";
import OrdersHeaderButtons from "./headerButtons";
import { toast } from "sonner";

export default function Orders() {
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
  const [orderStatus, setOrderStatus] = useState<OrderStatus>("pending");
  useError(error, userInfoError, commoditiesError, ordersError);
  if (loading || userInfoLoading || ordersLoading || commoditiesLoading)
    return <Loading />;
  if (!orders) return <p className="text-center">注文情報がありません</p>;
  if (!user || !userInfo?.stallId) return <AccessError />;

  const showOrders = Object.entries(orders)
    .reverse()
    // @ts-ignore
    .filter(([_, o]: [_: any, o: OrderType]) => {
      if (orderStatus == "all") return true;
      return o.status == orderStatus;
    }) as [id: UUID, order: OrderType][];
  return (
    <>
      <div className="flex justify-between p-4">
        <h2>注文情報</h2>
        <OrdersHeaderButtons
          orderStatus={orderStatus}
          setOrderStatus={setOrderStatus}
          commodities={commodities}
          orders={orders}
        />
      </div>
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        {showOrders?.map(([id, order]) => (
          <OrderCard
            key={id}
            order={{ ...order, id }}
            commodities={commodities}
            setOrderState={(status: OrderType["status"]) => {
              set(
                ref(db, `stalls/${userInfo.stallId}/orders/${id}/status`),
                status
              );
              toast.success("注文ステータスを更新しました:" + order.ticket);
            }}
          />
        ))}
        {showOrders.length == 0 && (
          <div className="text-center">条件を満たす注文情報がありません</div>
        )}
      </div>
    </>
  );
}
export type OrderStatus =
  | "all"
  | "pending"
  | "ready"
  | "completed"
  | "cancelled";
