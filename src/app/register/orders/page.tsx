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
import { auth, db } from "@/firebase";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { CheckIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
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
      <nav></nav>
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        {Object.entries(orders).map(
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
