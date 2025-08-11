"use client";
import AccessError from "@/components/accessError";
import Menu from "@/components/functional/register/menu/menu";
import Order from "@/components/functional/register/menu/order";
import Loading from "@/components/ui-element/loading";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import { auth, db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { useWindowSize } from "@/hooks/useWindowSize";
import { createUUID } from "@/lib/uuid";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { UserInfo } from "@/types/userInfo";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { generateTickerId } from "./generateTickerId";

export default function Register() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<UserInfo>(
    ref(db, `users/${user?.uid}`)
  );
  const [prefix, prefixLoading, prefixError] = useObjectVal<string>(
    ref(db, `stalls/${userInfo?.stallId}/prefix`)
  ); //Todo:変わらないため最初のみに読み込むようにする
  const [commodities, commoditiesLoading, commoditiesError] = useObjectVal<
    StallInfo["commodities"]
  >(ref(db, `stalls/${userInfo?.stallId}/commodities`));
  const [currentOrder, setCurrentOrder] = useState<{
    [key: string]: number;
  }>({});
  const [category, categoryLoading, categoryError] = useObjectVal<
    StallInfo["category"]
  >(ref(db, `stalls/${userInfo?.stallId}/category`));
  const [width] = useWindowSize();
  useError(error, userInfoError, commoditiesError, prefixError, categoryError);
  if (
    loading ||
    userInfoLoading ||
    commoditiesLoading ||
    prefixLoading ||
    categoryLoading
  )
    return <Loading />;
  if (!user || !userInfo) return <AccessError />;
  if (!commodities)
    return <p className="text-center">先に商品登録を行ってください</p>;
  async function handleOrder(
    order: Omit<OrderType, "status" | "ticket">
  ): Promise<OrderType & { id: UUID }> {
    if (!userInfo?.stallId || !commodities) throw new Error("No stall Info");
    const fullOrder: OrderType = {
      ...order,
      status: "pending",
      ticket: generateTickerId(prefix, userInfo, user)
    };
    const orderId = createUUID();
    await Promise.all(
      Object.entries(currentOrder).map(([key, value]) =>
        set(
          ref(db, `stalls/${userInfo.stallId}/commodities/${key}/stock`),
          (commodities[key]?.stock ?? 0) - value
        )
      )
    );
    await Promise.all([
      set(ref(db, `stalls/${userInfo.stallId}/orders/${orderId}`), fullOrder),
      set(
        ref(db, `users/${user?.uid}/lastTicket`),
        (userInfo?.lastTicket ?? 0) + 1
      )
    ]);
    setCurrentOrder({});
    return { ...fullOrder, id: orderId };
  }
  return (
    <ResizablePanelGroup direction={width < 768 ? "vertical" : "horizontal"}>
      <ResizablePanel className="space-y-4 !overflow-y-scroll p-4">
        <Menu
          commodities={commodities}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          categories={{
            all: {
              name: "全て",
            },
            ...(category as StallInfo["category"])
          }}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="space-y-4 p-4" defaultSize={25}>
        <Order
          commodities={commodities}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          handleOrder={handleOrder}
          stallId={userInfo.stallId}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
