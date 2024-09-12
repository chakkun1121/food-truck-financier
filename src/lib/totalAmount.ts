"use client";
import { OrderType, StallInfo } from "@/types/stallInfo";

// 合計金額を出す関数
export function totalAmount(
  commodities: StallInfo["commodities"],
  order: OrderType
) {
  return Object.entries(order.commodities).reduce(
    (acc, [commodityId, quantity]) =>
      acc + commodities?.[commodityId].price! * quantity,
    0
  );
}
