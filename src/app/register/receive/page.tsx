"use client";

import AccessError from "@/components/accessError";
import Loading from "@/components/ui-element/loading";
import { Card, CardContent } from "@/components/ui/card";
import { auth, db } from "@/firebase";
import { useError } from "@/hooks/useError";
import { OrderType } from "@/types/stallInfo";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";

export default function ReceivePage() {
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
      // @ts-ignore
      ([_, o]: [_: any, o: OrderType]) => o.status == "ready"
    ) as unknown as [UUID, OrderType][];
  return (
    <>
      <h2 className="text-2xl"></h2>
      <section className="flex flex-wrap gap-4 p-4">
        {receive.map(([id, order]) => (
          <button
            className="max-w-52"
            key={id}
            onClick={() => setOrderState(id, "completed")}
          >
            <Card>
              <CardContent className="p-8">
                <p className="text-center text-4xl font-bold">{order.ticket}</p>
              </CardContent>
            </Card>
          </button>
        ))}
        {!receive.length && (
          <p className="text-center text-2xl">
            受取準備が整った商品はありません
          </p>
        )}
      </section>
    </>
  );
}
