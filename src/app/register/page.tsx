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
  "3": { name: "ハンバーガー", price: 500, stock: 0, category: "2" },
  "4": { name: "アイスクリーム", price: 200, stock: 5, category: "3" },
  "5": { name: "コーヒー", price: 250, stock: 8, category: "1" },
  "6": { name: "赤", price: 100, stock: 10, category: "red" },
  "7": { name: "黄色", price: 100, stock: 10, category: "yellow" },
  "8": { name: "黄緑", price: 100, stock: 10, category: "lime" },
  "9": { name: "緑", price: 100, stock: 10, category: "green" },
  "10": { name: "エメラルド", price: 100, stock: 10, category: "emerald" },
  "11": { name: "ティール", price: 100, stock: 10, category: "teal" },
  "12": { name: "シアン", price: 100, stock: 10, category: "cyan" },
  "13": { name: "スカイ", price: 100, stock: 10, category: "sky" },
  "14": { name: "青", price: 100, stock: 10, category: "blue" },
  "15": { name: "バイオレット", price: 100, stock: 10, category: "violet" },
  "16": { name: "パープル", price: 100, stock: 10, category: "purple" },
  "17": { name: "フューシャ", price: 100, stock: 10, category: "fuchsia" },
  "18": { name: "ピンク", price: 100, stock: 10, category: "pink" },
  "19": { name: "ローズ", price: 100, stock: 10, category: "rose" },
  "20": { name: "ストーン", price: 100, stock: 10, category: "stone" },
  "21": { name: "ニュートラル", price: 100, stock: 10, category: "neutral" },
  "22": { name: "ジンク", price: 100, stock: 10, category: "zinc" },
  "23": { name: "グレー", price: 100, stock: 10, category: "gray" },
  "24": { name: "スレート", price: 100, stock: 10, category: "slate" }
};
const categories: { [key: string]: CategoryType } = {
  "1": { name: "ドリンク", color: "blue" },
  "2": { name: "フード", color: "green" },
  "3": { name: "デザート", color: "pink" },
  red: { name: "Red", color: "red" },
  yellow: { name: "Yellow", color: "yellow" },
  lime: { name: "Lime", color: "lime" },
  green: { name: "Green", color: "green" },
  emerald: { name: "Emerald", color: "emerald" },
  teal: { name: "Teal", color: "teal" },
  cyan: { name: "Cyan", color: "cyan" },
  sky: { name: "Sky", color: "sky" },
  blue: { name: "Blue", color: "blue" },
  violet: { name: "Violet", color: "violet" },
  purple: { name: "Purple", color: "purple" },
  fuchsia: { name: "Fuchsia", color: "fuchsia" },
  pink: { name: "Pink", color: "pink" },
  rose: { name: "Rose", color: "rose" },
  stone: { name: "Stone", color: "stone" },
  neutral: { name: "Neutral", color: "neutral" },
  zinc: { name: "Zinc", color: "zinc" },
  gray: { name: "Gray", color: "gray" },
  slate: { name: "Slate", color: "slate" }
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
          <OrderInfo
            commodities={commodities}
            categories={categories}
            order={order}
            setOrder={setOrder}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
