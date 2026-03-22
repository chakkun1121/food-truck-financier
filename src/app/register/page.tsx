"use client";
// 本来だめだがまずはUIを作ることに集中するため、クライアントコンポーネントにしている。

import { Button } from "@/components/ui/button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import CommodityCard from "./_components/CommodityCard";
import OrderCategoryCard from "./_components/OrderCategoryCard";
import OrderItemCard from "./_components/OrderItemCard";

export default function Register() {
  return (
    // The header causes some stuttering, but ignore that for now.
    <main className="h-dvh space-y-4">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize={75}
          className="flex flex-col space-y-4 p-4"
        >
          <div className="flex flex-none gap-4 overflow-x-scroll">
            <OrderCategoryCard name="すべて" itemCount={35} selected />
            <OrderCategoryCard name="ドリンク" itemCount={10} />
            <OrderCategoryCard name="フード" itemCount={20} />
            <OrderCategoryCard name="デザート" itemCount={5} />
          </div>
          <br />
          <div className="flex flex-wrap gap-4 overflow-x-hidden py-2">
            <CommodityCard
              name="コーラ"
              price={150}
              stock={20}
              count={0}
              setCount={() => {}}
            />
            <CommodityCard
              name="ポテト"
              price={300}
              stock={15}
              count={0}
              setCount={() => {}}
            />
            <CommodityCard
              name="ハンバーガー"
              price={500}
              stock={10}
              count={0}
              setCount={() => {}}
            />
            <CommodityCard
              name="アイスクリーム"
              price={200}
              stock={5}
              count={0}
              setCount={() => {}}
            />
            <CommodityCard
              name="コーヒー"
              price={250}
              stock={8}
              count={0}
              setCount={() => {}}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} className="flex flex-col p-4">
          <div className="flex-none border-b pb-2">
            <h2 className="text-xl">注文内容</h2>
          </div>
          <div className="flex-1 space-y-4 overflow-y-scroll py-4">
            <OrderItemCard name="コーラ" price={150} quantity={2} />
            <OrderItemCard name="ポテト" price={300} quantity={1} />
            <OrderItemCard name="ハンバーガー" price={500} quantity={3} />
            <OrderItemCard name="アイスクリーム" price={200} quantity={1} />
            <OrderItemCard name="コーヒー" price={250} quantity={2} />
            <OrderItemCard name="サンドイッチ" price={400} quantity={1} />
            <OrderItemCard name="ジュース" price={180} quantity={3} />
            <OrderItemCard name="サラダ" price={350} quantity={1} />
            <OrderItemCard name="スープ" price={250} quantity={2} />
            <OrderItemCard name="デザート" price={300} quantity={1} />
          </div>
          <div className="flex-none border-t pt-4">
            <Button className="w-full flex-none p-6 pt-4">支払いに進む</Button>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
