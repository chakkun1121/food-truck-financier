import Loading from "@/components/ui-element/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { auth, db } from "@/firebase";
import { UUIDv7GetTimestamp } from "@/lib/uuidv7-get-timestamp";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { UserInfo } from "@/types/userInfo";
import { CheckIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { toast } from "sonner";

export default function OrderCard({
  order,
  commodities,
  setOrderState
}: {
  order: OrderType & { id: UUID };
  commodities: StallInfo["commodities"];
  setOrderState: (state: OrderType["status"]) => void;
}) {
  const timestamp = (() => {
    try {
      return UUIDv7GetTimestamp(order.id);
    } catch {
      return new Date();
    }
  })();

  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<UserInfo>(
    ref(db, `users/${user?.uid}`)
  );
  if (loading || userInfoLoading) return <Loading />;
  if (!user || !userInfo)
    return <p>エラーが発生しました。再度読み込んで下さい。</p>;
  if (error || userInfoError)
    return <p>エラーが発生しました。再度読み込んで下さい。</p>;
  function cancelOrder() {
    setOrderState("cancelled");
    Object.entries(order.commodities).forEach(([commodityId, amount]) =>
      set(
        ref(db, `stalls/${userInfo!.stallId}/commodities/${commodityId}/stock`),
        (commodities?.[commodityId]?.stock ?? 0) + amount
      )
    );
  }
  function completeOrder(e?: { shiftKey: boolean }) {
    if (e?.shiftKey) {
      setOrderState("completed");
      return;
    }
    toast("本当に受け取りを完了としますか?", {
      action: {
        label: "はい",
        onClick: () => setOrderState("completed")
      },
      cancel: {
        label: "いいえ",
        onClick: () => {}
      },
      position: "top-center",
      description: "Shift + 「受取完了」でこの確認をスキップできます"
    });
  }

  return (
    <Card className="m-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-xl">
            {order?.ticket} {order?.numberTag && `(${order.numberTag})`}
          </CardTitle>
          <Badge variant="outline">{order?.status}</Badge>
          {order?.status &&
            (order.status == "pending" || order.status == "ready") && (
              <Button
                onClick={e => {
                  if (order.status === "pending") {
                    setOrderState("ready");
                  } else {
                    completeOrder(e);
                  }
                }}
                aria-label={`make as ${
                  order.status == "pending" ? "ready" : "completed"
                }`}
              >
                <CheckIcon />
                {order.status == "pending" ? "準備完了" : "受取完了"}
              </Button>
            )}
        </div>
        <div className="flex items-center gap-4">
          <p className="opacity-80">
            {timestamp.toDateString() !== new Date().toDateString() &&
              [
                ("00" + (timestamp.getMonth() + 1)).slice(-2),
                ("00" + timestamp.getDate()).slice(-2)
              ].join("/")}
            {[
              ("00" + timestamp.getHours()).slice(-2),
              ("00" + timestamp.getMinutes()).slice(-2),
              ("00" + timestamp.getSeconds()).slice(-2)
            ].join(":")}
          </p>
          {order?.status &&
            (order.status == "pending" || order.status == "ready") && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild aria-label="More options">
                  <Button variant="ghost">
                    <DotsVerticalIcon />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={cancelOrder}>
                    キャンセル
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div>
          {Object.entries(order?.commodities || {}).map(
            ([commodityId, amount]) => (
              <div
                key={commodityId}
                className="flex items-center justify-between"
              >
                <span className="text-3xl font-bold">
                  {commodities?.[commodityId as UUID]?.name}
                </span>
                <span className="text-xl font-bold">{amount}</span>
              </div>
            )
          )}
        </div>
        <hr className="mt-2 w-full" />
        {order?.note && <div className="opacity-60">{order.note}</div>}
        <div className="flex items-center justify-between">
          <p>
            計
            <span className="text-lg font-bold">
              {Object.values(order?.commodities || {}).reduce(
                (prev, current) => prev + current,
                0
              )}
            </span>
            点
          </p>
          <p className="text-lg">{order?.receivedAmount}円</p>
        </div>
      </CardContent>
    </Card>
  );
}
