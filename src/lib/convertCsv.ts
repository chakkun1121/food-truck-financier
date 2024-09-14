"use client";
import { totalAmount } from "@/lib/totalAmount";
import { UUIDv7GetTimestamp } from "@/lib/uuidv7-get-timestamp";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { UUID } from "crypto";

export function convertCsv(
  commodities: StallInfo["commodities"],
  orders: { [key: UUID]: OrderType }
) {
  if (!commodities || !orders) {
    return "";
  }
  // 注文番号 合計金額 注文日時 受取日時 ステータス
  const csv = [
    ["注文番号", "合計金額", "注文日時", "受取日時", "ステータス"],
    // @ts-ignore
    ...Object.entries(orders)
      // @ts-ignore
      .map(([id, order]: [id: UUID, order: OrderType]) =>
        [
          order.ticket,
          totalAmount(commodities, order).toString(),
          new Date(UUIDv7GetTimestamp(id)).toLocaleString("ja-JP", {
            timeZone: "Asia/Tokyo"
          }),
          "",
          order.status
        ].join(",")
      ),
    "",
    ["商品名", "販売個数", "在庫数"],
    ...Object.entries(commodities).map(
      // @ts-ignore
      ([id, commodity]: [id: UUID, commodity: CommodityType]) =>
        [
          commodity.name,
          Object.values(orders).reduce(
            (acc, order) => acc + (order.commodities[id] || 0),
            0
          ),
          commodity.stock.toString()
        ].join(",")
    )
  ].join("\n");
  return csv;
}
