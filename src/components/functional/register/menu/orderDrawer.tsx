import KeyPad from "@/components/ui-element/keypad";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
} from "@/components/ui/drawer";
import { StallInfo } from "@/types/stallInfo";
import { UUID } from "crypto";
import { useState } from "react";
import { toast } from "sonner";

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
  handleOrder: () => Promise<void>;
}) {
  const sum = Object.entries(currentOrder).reduce((sum, [key, value]) => {
    const price = commodities?.[key as UUID]?.price || 0;
    return sum + price * value;
  }, 0);
  const [open, setOpen] = useState(false);
  const [ordering, setOrdering] = useState(false);
  return (
    <Drawer direction="right" onOpenChange={o => setOpen(o)} open={open}>
      <DrawerTrigger
        asChild
        disabled={Object.values(currentOrder).every(value => value === 0)}
      >
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-full flex flex-col max-w-4xl w-full right-0 left-auto">
        {ordering ? (
          <p className="text-center">注文を送信中</p>
        ) : (
          <>
            <DrawerHeader className="flex-none">金額入力</DrawerHeader>
            <div className="flex flex-1 p-4 gap-4">
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
              <KeyPad className="flex-none mx-16" onChange={setReceivedMoney} />
            </div>
            <DrawerFooter className="flex-none">
              <Button
                disabled={sum > receivedMoney}
                onClick={async () => {
                  setOrdering(true);
                  await handleOrder();
                  setOrdering(false);
                  toast("注文を送信しました");
                  setOpen(false);
                }}
              >
                注文を確定する
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
