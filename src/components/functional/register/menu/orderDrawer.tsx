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

export default function OrderDrawer({
  currentOrder,
  receivedMoney,
  setReceivedMoney,
  stallInfo,
  trigger,
}: {
  currentOrder: { [key: UUID]: number };
  receivedMoney: number;
  setReceivedMoney(receivedMoney: number): void;
  stallInfo: StallInfo;
  trigger: React.ReactNode;
}) {
  const sum = Object.entries(currentOrder).reduce((sum, [key, value]) => {
    const price = stallInfo?.commodities?.[key as UUID]?.price || 0;
    return sum + price * value;
  }, 0);
  return (
    <Drawer direction="right">
      <DrawerTrigger
        asChild
        disabled={Object.values(currentOrder).every(value => value === 0)}
      >
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="h-full flex flex-col max-w-4xl w-full right-0 left-auto">
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
          <Button disabled={sum > receivedMoney}>注文を確定する</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
