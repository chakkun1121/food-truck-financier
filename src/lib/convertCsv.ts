"use client";
import { totalAmount } from "@/lib/totalAmount";
import { UUIDv7GetTimestamp } from "@/lib/uuidv7-get-timestamp";
import { CommodityType, OrderType, StallInfo } from "@/types/stallInfo";
import { UUID } from "crypto";

export function convertCsv(
  commodities: Partial<StallInfo["commodities"]>,
  orders: { [key: UUID]: Partial<OrderType> | undefined | null }
) {
  if (!commodities || !orders) {
    return "";
  }
  // 注文番号 合計金額 注文日時 受取日時 ステータス
  const csv = [
    ["注文番号", "合計金額", "注文日時", "受取日時", "ステータス"],
    ...Object.entries(orders).map(([id, order]) =>
      [
        order?.ticket,
        order ? totalAmount(commodities, order as OrderType).toString() : "0",
        new Date(UUIDv7GetTimestamp(id as UUID)).toLocaleString("ja-JP", {
          timeZone: "Asia/Tokyo"
        }),
        "",
        order?.status
      ].join(",")
    ),
    "",
    ["商品名", "販売個数", "在庫数"],
    ...Object.entries(commodities)
      .filter((entry): entry is [string, CommodityType] => !!entry[1])
      .map(([id, commodity]) =>
        [
          commodity.name,
          Object.values(orders).reduce(
            (acc, order) => acc + (order?.commodities?.[id as UUID] || 0),
            0
          ),
          commodity.stock.toString()
        ].join(",")
      )
  ].join("\n");
  return csv;
}
