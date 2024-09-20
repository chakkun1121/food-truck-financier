"use client";
import { OrderType, StallInfo } from "@/types/stallInfo";

// 合計金額を出す関数
export function totalAmount(
  commodities: Partial<StallInfo["commodities"]>,
  order: Partial<OrderType>
) {
  return Object.entries(order?.commodities || {}).reduce(
    (acc, [commodityId, quantity]) =>
      acc + (commodities?.[commodityId]?.price ?? 0) * quantity,
    0
  );
}
