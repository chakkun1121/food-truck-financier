"use client";
import Loading from "@/components/ui-element/loading";
import { auth, db } from "@/firebase";
import { UUID } from "crypto";
import { ref } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import AccessError from "@/components/accessError";
import { StallInfo } from "@/types/stallInfo";
import Menu from "@/components/functional/register/menu/menu";
import Order from "@/components/functional/register/menu/order";

export default function RegisterPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallInfo, stallInfoLoading, stallInfoError] = useObjectVal<StallInfo>(
    ref(db, `stalls/${userInfo?.stallId}`)
  );
  const [currentOrder, setCurrentOrder] = useState<{
    [key: UUID]: number;
  }>({});
  const [receivedMoney, setReceivedMoney] = useState(0);

  if (loading || userInfoLoading || stallInfoLoading) return <Loading />;
  if (!user || !stallInfo) return <AccessError />;
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="p-4">
        <Menu
          stallInfo={stallInfo}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
        />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="p-4 space-y-4" defaultSize={25}>
        <Order
          stallInfo={stallInfo}
          currentOrder={currentOrder}
          setCurrentOrder={setCurrentOrder}
          receivedMoney={receivedMoney}
          setReceivedMoney={setReceivedMoney}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
