"use client";
import Loading from "@/components/ui-element/loading";
import { auth, db } from "@/firebase";
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
import { OrderType, StallInfo } from "@/types/stallInfo";
import Menu from "@/components/functional/register/menu/menu";
import Order from "@/components/functional/register/menu/order";
import { createUUID } from "@/lib/uuid";
import { useError } from "@/hooks/useError";

export default function RegisterPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
    lastTicket?: number; //最後に発見した整理券の番号
    userNumber: number; //ユーザーごとに固有 0から割り振る
  }>(ref(db, `users/${user?.uid}`));
  const [prefix, prefixLoading] = useObjectVal<string>(
    ref(db, `stalls/${userInfo?.stallId}/prefix`)
  ); //Todo:変わらないため最初のみに読み込むようにする
  const [commodities, commoditiesLoading, commoditiesError] = useObjectVal<
    StallInfo["commodities"]
  >(ref(db, `stalls/${userInfo?.stallId}/commodities`));
  const [currentOrder, setCurrentOrder] = useState<{
    [key: string]: number;
  }>({});
  useError(error, userInfoError, commoditiesError);
  if (loading || userInfoLoading || commoditiesLoading || prefixLoading)
    return <Loading />;
  if (!user || !commodities) return <AccessError />;
  async function handleOrder(receivedAmount: number): Promise<OrderType> {
    if (!userInfo?.stallId || !commodities) throw new Error("No stall Info");
    const order: OrderType = {
      commodities: currentOrder,
      receivedAmount,
      status: "pending",
      // userNumberが存在しない場合、メールアドレスの@の前の1文字を使用する
      ticket: `${prefix}-${
        userInfo.userNumber ?? user?.email?.split("@")[0].slice(-1)
      }${("000" + (userInfo?.lastTicket ?? 0 + 1)).slice(-3)}`,
    };
    console.log(order);
    const orderId = createUUID();
    await Promise.all(
      Object.entries(currentOrder).map(([key, value]) =>
        set(
          ref(db, `stalls/${userInfo.stallId}/commodities/${key}/stock`),
          //  @ts-ignore next-line
          commodities[key]?.stock - value
        )
      )
    );
    await Promise.all([
      set(ref(db, `stalls/${userInfo.stallId}/orders/${orderId}`), order),
      // set last ticket ID
      set(
        ref(db, `users/${user?.uid}/lastTicket`),
        (userInfo?.lastTicket ?? 0) + 1
      ),
    ]);
    setCurrentOrder({});
    return order;
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
