"use client";
import Loading from "@/components/ui-element/loading";
import { auth, db } from "@/firebase";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AccessError from "@/components/accessError";
import { CommodityType, OrderType, StallInfo } from "@/types/stallInfo";
import Menu from "@/components/functional/register/menu/menu";
import Order from "@/components/functional/register/menu/order";
import { createUUID } from "@/lib/uuid";

export default function RegisterPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [commodities, commoditiesLoading, commoditiesError] = useObjectVal<
    StallInfo["commodities"]
  >(ref(db, `stalls/${userInfo?.stallId}/commodities`));
  const [currentOrder, setCurrentOrder] = useState<{
    [key: string]: number;
  }>({});

  if (loading || userInfoLoading || commoditiesLoading) return <Loading />;
  if (!user || !commodities) return <AccessError />;
  async function handleOrder(receivedAmount: number) {
    if (!userInfo?.stallId) return;
    const order: OrderType = {
      commodities: currentOrder,
      receivedAmount,
      status: "pending",
    };
    const orderId = createUUID();
    if (commodities)
      await Promise.all(
        Object.entries(currentOrder).map(([key, value]) =>
          set(
            ref(db, `stalls/${userInfo.stallId}/commodities/${key}/stock`),
            //  @ts-ignore next-line
            commodities[key]?.stock - value
          )
        )
      );
    await set(ref(db, `stalls/${userInfo.stallId}/orders/${orderId}`), order);
    setCurrentOrder({});
  }
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="p-4">
        <Menu
          commodities={commodities}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="p-4 space-y-4" defaultSize={25}>
        <Order
          commodities={commodities}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          handleOrder={handleOrder}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
