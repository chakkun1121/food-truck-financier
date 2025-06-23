"use client";

import AccessError from "@/components/accessError";
import Loading from "@/components/ui-element/loading";
import { auth, db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { OrderType } from "@/types/stallInfo";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import OrderCard from "./orderCard";

export default function Receive() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [orders, ordersLoading, ordersError] = useObjectVal<{
    [key: UUID]: OrderType;
  }>(ref(db, `stalls/${userInfo?.stallId}/orders`));
  useError(error, userInfoError, ordersError);
  if (loading || userInfoLoading || ordersLoading || !orders)
    return <Loading />;
  if (!user || !userInfo?.stallId) return <AccessError />;
  function setOrderState(id: string, status: OrderType["status"]) {
    set(ref(db, `stalls/${userInfo?.stallId}/orders/${id}/status`), status);
  }
  const receive = Object.entries(orders)
    .reverse()
    .filter(
      ([, o]) =>
        typeof o === "object" &&
        o !== null &&
        "status" in o &&
        o.status === "ready"
    ) as [UUID, OrderType][];

  return (
    <>
      {receive.map(([id, order]) => (
        <OrderCard
          id={id}
          order={order}
          setOrderState={setOrderState}
          key={id}
        />
      ))}
      {!receive.length && (
        <p className="text-center text-2xl">受取準備が整った商品はありません</p>
      )}
    </>
  );
}
