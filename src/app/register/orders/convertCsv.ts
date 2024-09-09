"use client";
import { UUIDv7GetTimestamp } from "@/lib/uuidv7-get-timestamp";
import { StallInfo, OrderType } from "@/types/stallInfo";
import { UUID } from "crypto";
import { totalAmount } from "../../../lib/totalAmount";

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
            timeZone: "Asia/Tokyo",
          }),
          "",
          order.status,
        ].join(",")
      ),
  ].join("\n");
  return csv;
}
