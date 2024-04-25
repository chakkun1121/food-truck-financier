"use client";

import AccessError from "@/components/accessError";
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
    stallId?: string;
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
  if (!user) return <AccessError />;
  return (
    <>
      <nav></nav>
      <div className="p-4 max-w-7xl mx-auto space-y-4">
        {Object.entries(orders).map(
          // @ts-ignore // なぜかidがstringとなるため踏み倒す
          ([id, order]: [id: UUID, order: OrderType], index) => (
            <Card key={id}>
              <CardHeader className="flex flex-row items-center justify-between p-4">
                <div className="flex gap-4 items-center">
                  <CardTitle>{index}</CardTitle>
                  <Badge variant="outline">{order.status}</Badge>
                  {order.status == "pending" && (
                    <Button
                      onClick={() => {
                        set(
                          ref(
                            db,
                            `stalls/${userInfo?.stallId}/orders/${id}/status`
                          ),
                          "completed"
                        );
                      }}
                      aria-label="complete"
                      variant="outline"
                    >
                      <CheckIcon />
                    </Button>
                  )}
                </div>
                {order.status == "pending" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <DotsVerticalIcon />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => {
                          set(
                            ref(
                              db,
                              `stalls/${userInfo?.stallId}/orders/${id}/status`
                            ),
                            "cancelled"
                          );
                        }}
                      >
                        キャンセル
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div>
                  {Object.entries(order.commodities).map(
                    // @ts-ignore // なぜかcommodityIdがstringとなるため踏み倒す
                    ([commodityId, amount]: [
                      commodityId: UUID,
                      amount: number
                    ]) => (
                      <div
                        key={commodityId}
                        className="flex justify-between items-center"
                      >
                        <span>{commodities?.[commodityId]?.name}</span>
                        <span className="text-lg">{amount}</span>
                      </div>
                    )
                  )}
                </div>
                <br className="w-full h-1 border border-w-full" />
                <div className="flex justify-between items-center">
                  <p>
                    計
                    {Object.values(order.commodities).reduce(
                      (prev, current) => prev + current
                    )}
                    点
                  </p>
                  <p className="text-lg">{order.receivedAmount}円</p>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </>
  );
}
