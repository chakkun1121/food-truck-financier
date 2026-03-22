"use client";
// 本来だめだがまずはUIを作ることに集中するため、クライアントコンポーネントにしている。

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup
} from "@/components/ui/resizable";
import type { CategoryType, CommodityType, OrderType } from "@/types/stallInfo";
import { useState } from "react";
import OrderInfo from "./_components/OrderInfo";
import SelectCommodities from "./_components/SelectCommodities";

const commodities: { [key: string]: CommodityType } = {
  "1": { name: "コーラ", price: 150, stock: 20, category: "1" },
  "2": { name: "ポテト", price: 300, stock: 15, category: "2" },
  "3": { name: "ハンバーガー", price: 500, stock: 10, category: "2" },
  "4": { name: "アイスクリーム", price: 200, stock: 5, category: "3" },
  "5": { name: "コーヒー", price: 250, stock: 8, category: "1" }
};
const categories: { [key: string]: CategoryType } = {
  "1": { name: "ドリンク", color: "blue" },
  "2": { name: "フード", color: "green" },
  "3": { name: "デザート", color: "pink" }
};

export default function Register() {
  const [order, setOrder] = useState<Partial<OrderType>>({});
  return (
    // The header causes some stuttering, but ignore that for now.
    <main className="h-dvh space-y-4">
      <ResizablePanelGroup orientation="horizontal">
        <ResizablePanel
          defaultSize={75}
          className="flex flex-col space-y-4 p-4"
        >
          <SelectCommodities
            categories={categories}
            commodities={commodities}
            order={order}
            setOrder={setOrder}
          />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25} className="flex flex-col p-4">
          <OrderInfo commodities={commodities} order={order} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
