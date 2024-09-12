import KeyPad from "@/components/ui-element/keypad";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export default function OrderDrawer({
  currentOrder,
  receivedMoney,
  setReceivedMoney,
  commodities,
  trigger,
  handleOrder,
}: {
  currentOrder: { [key: UUID]: number };
  receivedMoney: number;
  setReceivedMoney(receivedMoney: number): void;
  commodities: StallInfo["commodities"];
  trigger: React.ReactNode;
  handleOrder: () => Promise<OrderType>;
}) {
  const sum = Object.entries(currentOrder).reduce((sum, [key, value]) => {
    const price = commodities?.[key as UUID]?.price || 0;
    return sum + price * value;
  }, 0);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"input" | "ordering" | "finished">("input");
  const [lastOrderInfo, setLastOrderInfo] = useState<
    { ticketId: string; sum: number } | undefined
  >();
  async function order() {
    setMode("ordering");
    const lastSum = sum;
    const order = await handleOrder();
    setMode("finished");
    setLastOrderInfo({ ticketId: order.ticket, sum: lastSum });
  }
  const valueSchema = z.number().min(0).max(Number.MAX_SAFE_INTEGER);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const result = valueSchema.safeParse(receivedMoney);
    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      setError(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receivedMoney]);
  return (
    <Drawer
      direction="right"
      onOpenChange={o => {
        setOpen(o);
        if (!o) {
          setMode("input");
          setReceivedMoney(0);
          setLastOrderInfo(undefined);
        }
      }}
      open={open}>
      <DrawerTrigger
        asChild
        disabled={Object.values(currentOrder).every(value => value === 0)}>
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-full flex flex-col max-w-4xl w-full right-0 left-auto overflow-y-scroll overflow-x-hidden">
        {mode === "input" && (
          <>
            <DrawerHeader className="flex-none">金額入力</DrawerHeader>
            <div className="flex flex-1 p-4 gap-4 md:flex-row flex-col">
              <div className="flex-1">
                <p className="flex justify-between text-xl">
                  <span>点数:</span>
                  <span>{}</span>
                </p>
                <p className="flex justify-between text-xl">
                  <span>小計</span>
                  <span>¥{sum}</span>
                </p>
                <br />
                <p className="flex justify-between text-2xl">
                  <span>合計</span>
                  <span>¥{sum}(税込)</span>
                </p>
              </div>
              <div className="flex-none mx-16">
                <KeyPad
                  onChange={setReceivedMoney}
                  onSubmit={() => sum <= receivedMoney && order()}
                />
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </div>
            <DrawerFooter className="flex-none">
              <Button disabled={sum > receivedMoney || !!error} onClick={order}>
                注文を確定する
              </Button>
            </DrawerFooter>
          </>
        )}
        {mode === "ordering" && <p className="text-center p-4">注文を送信中</p>}
        {mode === "finished" && (
          <>
            <div className="flex-1 p-4 ">
              <DrawerHeader>注文完了</DrawerHeader>
              <CheckCircledIcon className="mx-auto text-primary h-48 w-48" />
              <h2 className="text-center text-2xl">
                整理券:
                <span className="font-bold text-3xl">
                  {lastOrderInfo?.ticketId}
                </span>
              </h2>
              <h2 className="text-center text-2xl">
                お釣り:
                <span className="font-bold text-3xl">
                  ¥{receivedMoney - (lastOrderInfo?.sum ?? 0)}
                </span>
              </h2>
            </div>
            <DrawerFooter className="flex-none p-4">
              <DrawerClose asChild>
                <Button>閉じる </Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
