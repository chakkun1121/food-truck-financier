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
};
export type CommodityType = {
  name: string;
  price: number;
  stock: number;
};
export type OrderType = {
  commodities: { [commodityId: UUID]: number };
  receivedAmount: number; //受け取った金額
  status: "pending" | "completed" | "cancelled";
  ticket: string;
};
