import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckIcon, DotsVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { UUID } from "crypto";
import { UUIDv7GetTimestamp } from "@/lib/uuidv7-get-timestamp";

export default function OrderCard({
  order,
  commodities,
  setOrderState,
}: {
  order: OrderType & { id: UUID };
  commodities: StallInfo["commodities"];
  setOrderState: (state: OrderType["status"]) => void;
}) {
  const timestamp = UUIDv7GetTimestamp(order.id);
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex gap-4 items-center">
          <CardTitle>{order.ticket}</CardTitle>
          <Badge variant="outline">{order.status}</Badge>
          {order.status == "pending" && (
            <Button
              onClick={() => {
                setOrderState("completed");
              }}
              aria-label="complete"
              variant="outline"
            >
              <CheckIcon />
            </Button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <p className="opacity-80">
            {timestamp.toDateString() !== new Date().toDateString() &&
              [
                ("00" + (timestamp.getMonth() + 1)).slice(-2),
                ("00" + timestamp.getDate()).slice(-2),
              ].join("/")}
            {[
              ("00" + timestamp.getHours()).slice(-2),
              ("00" + timestamp.getMinutes()).slice(-2),
              ("00" + timestamp.getSeconds()).slice(-2),
            ].join(":")}
          </p>
          {order.status == "pending" && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild aria-label="More options">
                <Button variant="outline">
                  <DotsVerticalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => {
                    setOrderState("completed");
                  }}
                >
                  キャンセル
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div>
          {Object.entries(order.commodities).map(
            // @ts-ignore // なぜかcommodityIdがstringとなるため踏み倒す
            ([commodityId, amount]: [commodityId: UUID, amount: number]) => (
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
  );
}
