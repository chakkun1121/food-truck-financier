"use client";
import { UUIDv7GetTimestamp } from "@/lib/uuidv7-get-timestamp";
import { StallInfo, OrderType } from "@/types/stallInfo";
import { UUID } from "crypto";

export function convertCsv(
  commodities: StallInfo["commodities"],
  orders: { [key: UUID]: OrderType }
) {
  // 注文番号 合計金額 注文日時 受取日時 ステータス
  const csv = [
    ["注文番号", "合計金額", "注文日時", "受取日時", "ステータス"],
    // @ts-ignore
    ...Object.entries(orders)
      // @ts-ignore
      .map(([id, order]: [id: UUID, order: OrderType]) =>
        [
          order.ticket,
          Object.entries(order.commodities)
            .reduce(
              (acc, [commodityId, quantity]) =>
                acc + commodities?.[commodityId].price! * quantity,
              0
            )
            .toString(),

          new Date(UUIDv7GetTimestamp(id)).toLocaleString(),
          "",
          order.status,
        ].join(",")
      ),
  ].join("\n");
  return csv;
}
