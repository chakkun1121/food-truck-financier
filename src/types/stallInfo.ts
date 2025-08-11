import { UUID } from "crypto";

export type StallInfo = {
  name: string;
  prefix: string; // 番号札発券時に使用
  commodities?: {
    [key: string]: CommodityType;
  };
  orders?: {
    [key: UUID]: OrderType;
  };
  category?: {
    [key: string]: CategoryType;
  };
};
export type CommodityType = {
  name: string;
  price: number;
  stock: number;
  category?: string;
};
export type OrderType = {
  commodities: { [commodityId: UUID]: number };
  receivedAmount: number; //受け取った金額
  /**
   * status
   * pending: 裏で準備中
   * ready: 受取準備完了
   * completed: 受け取り完了
   * cancelled: キャンセル
   */
  status: "pending" | "ready" | "completed" | "cancelled";
  ticket: string;
  note?: string;
  numberTag?: number;
  category?: string | undefined;
};

export type CategoryType = {
  name: string;
  color?:
    | "red"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | "stone"
    | "neutral"
    | "zinc"
    | "gray"
    | "slate";
};
