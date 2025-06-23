import KeyPad from "@/components/ui-element/keypad";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { db } from "@/firebase";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import { UUID } from "crypto";
import { ref, set } from "firebase/database";
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
  stallId
}: {
  currentOrder: { [key: UUID]: number };
  receivedMoney: number;
  setReceivedMoney(receivedMoney: number): void;
  commodities: StallInfo["commodities"];
  trigger: React.ReactNode;
  handleOrder: (
    order: Omit<OrderType, "status" | "ticket">
  ) => Promise<OrderType & { id: UUID }>;
  stallId: string | undefined;
}) {
  const sum = Object.entries(currentOrder).reduce((sum, [key, value]) => {
    const price = commodities?.[key as UUID]?.price || 0;
    return sum + price * value;
  }, 0);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"input" | "ordering" | "finished">("input");
  const [lastOrderInfo, setLastOrderInfo] = useState<
    (OrderType & { sum: number; id: UUID }) | undefined
  >();
  const [note, setNote] = useState<string>("");

  async function order() {
    setMode("ordering");
    const order = await handleOrder({
      commodities: Object.fromEntries(
        Object.entries(currentOrder).filter(([, value]) => value !== 0)
      ),
      receivedAmount: receivedMoney,
      note
    });
    setNote("");
    setMode("finished");
    setLastOrderInfo({ ...order, sum });
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
          setNote("");
          setMode("input");
          setReceivedMoney(0);
          setLastOrderInfo(undefined);
        }
      }}
      open={open}
    >
      <DrawerTrigger
        asChild
        disabled={Object.values(currentOrder).every(value => value === 0)}
      >
        {trigger}
      </DrawerTrigger>
      <DrawerContent className="right-0 left-auto flex h-full w-full max-w-4xl flex-col overflow-x-hidden overflow-y-scroll">
        {mode === "input" && (
          <>
            <DrawerHeader className="flex-none">
              <DrawerTitle>金額入力</DrawerTitle>
            </DrawerHeader>
            <div className="flex flex-1 flex-col gap-4 p-4 md:flex-row">
              <div className="flex-1 space-y-2">
                <div>
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
                <div>
                  <Textarea
                    className="my-4 h-24 w-full rounded-md border border-gray-300 p-2"
                    placeholder="備考"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                  />
                  <div className="flex flex-wrap gap-2">
                    {[
                      "イートイン",
                      "テイクアウト",
                      "orderページに表示しない"
                    ].map(t => (
                      <Button
                        key={t}
                        className="w-full"
                        onClick={() => setNote(`${note} ${t}`)}
                      >
                        {t}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mx-16 flex-none">
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
        {mode === "ordering" && <p className="p-4 text-center">注文を送信中</p>}
        {mode === "finished" && (
          <Finished lastOrderInfo={lastOrderInfo} stallId={stallId} />
        )}
      </DrawerContent>
    </Drawer>
  );
}
function Finished({
  lastOrderInfo,
  stallId
}: {
  lastOrderInfo: (OrderType & { sum: number; id: UUID }) | undefined;
  stallId: string | undefined;
}) {
  const [numberTag, setNumberTag] = useState<number | undefined>();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <>
      <div className="flex flex-1 gap-2 p-4">
        <div className="flex-1">
          <DrawerHeader>注文完了</DrawerHeader>
          <CheckCircledIcon className="text-primary mx-auto h-48 w-48" />
          <h2 className="text-center text-2xl">
            整理券:
            <span className="text-3xl font-bold">{lastOrderInfo?.ticket}</span>
          </h2>
          <h2 className="text-center text-2xl">
            お釣り:
            <span className="text-3xl font-bold">
              ¥
              {(lastOrderInfo?.receivedAmount ?? 0) - (lastOrderInfo?.sum ?? 0)}
            </span>
          </h2>
        </div>
        <div className="px-auto mx-16 flex-none space-y-2">
          <h2 className="my-6 text-lg font-bold">番号札</h2>
          <KeyPad onChange={v => setNumberTag(v)} />
          <Button
            className="w-full"
            onClick={async () => {
              setSaving(true);
              await set(
                ref(
                  db,
                  `stalls/${stallId}/orders/${lastOrderInfo?.id}/numberTag`
                ),
                numberTag
              );
              toast.info("番号札を登録しました");
              setSaving(false);
              setSaved(true);
            }}
            disabled={saving}
          >
            保存
          </Button>
        </div>
      </div>
      <DrawerFooter className="flex-none p-4">
        <DrawerClose asChild disabled={!!(numberTag && !saved)}>
          <Button>閉じる</Button>
        </DrawerClose>
      </DrawerFooter>
    </>
  );
}
