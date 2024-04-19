"use client";
import Loading from "@/components/ui-element/loading";
import { Button } from "@/components/ui/button";
import { auth, db } from "@/firebase";
import { UUID } from "crypto";
import { ref } from "firebase/database";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { useObjectVal } from "react-firebase-hooks/database";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PlusIcon, MinusIcon, TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
export default function RegisterPage() {
  const [user, loading, error] = useAuthState(auth);
  const [userInfo, userInfoLoading, userInfoError] = useObjectVal<{
    stallId?: string;
  }>(ref(db, `users/${user?.uid}`));
  const [stallInfo, stallInfoLoading, stallInfoError] = useObjectVal<{
    name: string;
    commodities?: {
      [key: UUID]: {
        name: string;
        price: number;
      };
    };
  }>(ref(db, `stalls/${userInfo?.stallId}`));
  const [currentOrder, setCurrentOrder] = useState<{
    [key: UUID]: number;
  }>({});
  if (loading || userInfoLoading || stallInfoLoading) return <Loading />;
  if (!user || !stallInfo)
    return (
      <div className="text-center">
        <h2>正しいユーザーでログインするか管理者へお問い合わせください。</h2>
        <Button asChild>
          <Link href="/logout">ログアウト</Link>
        </Button>
      </div>
    );
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel className="p-4">
        <h2 className="text-2xl">メニュー</h2>
        <div className="flex flex-wrap gap-4">
          {stallInfo?.commodities &&
            Object.entries(stallInfo?.commodities).map(([key, value]) => (
              <CommodityCard
                key={key}
                commodity={value}
                count={currentOrder[key as UUID] || 0}
                setCount={c => {
                  setCurrentOrder(o => ({ ...o, [key]: c }));
                }}
              />
            ))}
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="p-4 flex flex-col gap-4" defaultSize={25}>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl">注文内容</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentOrder({})}
          >
            <TrashIcon />
          </Button>
        </div>
        <div className="flex flex-col gap-2">
          {Object.entries(currentOrder)
            .filter(([_, value]) => value)
            .map(([key, value]) => (
              <Card key={key}>
                <CardContent className="p-2 flex justify-between items-center">
                  <p>
                    <span className="text-lg">
                      {stallInfo?.commodities?.[key as UUID].name}
                    </span>
                    <span className="opacity-70"> × {value}</span>
                  </p>
                  <p className="opacity-80">
                    ¥
                    {(stallInfo.commodities?.[key as UUID]?.price || 0) * value}
                  </p>
                </CardContent>
              </Card>
            ))}
        </div>
        <div className="p-4">
          <p className="flex items-center justify-between">
            <span>計:</span>
            <span className="text-xl">
              ¥
              {Object.entries(currentOrder).reduce((sum, [key, value]) => {
                const price = stallInfo?.commodities?.[key as UUID]?.price || 0;
                return sum + price * value;
              }, 0)}
            </span>
          </p>
        </div>
        <Button
          className="w-full"
          disabled={Object.values(currentOrder).every(value => value === 0)}
        >
          注文する
        </Button>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

function CommodityCard({
  commodity,
  count,
  setCount,
}: {
  commodity: {
    name: string;
    price: number;
  };
  count: number;
  setCount(count: number): void;
}) {
  return (
    <Card className="max-w-xs w-full">
      <CardContent className="p-6 flex justify-between">
        <div>
          <h3 className="text-xl">{commodity.name}</h3>
          <p className="ml-1">¥{commodity.price}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            onClick={() => setCount(count - 1)}
            disabled={count === 0}
          >
            <MinusIcon />
          </Button>
          <p className="text-lg">{count}</p>
          <Button
            className="rounded-full"
            variant="outline"
            size="icon"
            onClick={() => setCount(count + 1)}
          >
            <PlusIcon />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
