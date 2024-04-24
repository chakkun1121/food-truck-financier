import { UUID } from "crypto";

export type StallInfo = {
  name: string;
  commodities?: {
    [key: UUID]: {
      name: string;
      price: number;
    };
  };
  orders?: {
    [key: UUID]: OrderType;
  };
};
export type OrderType = {
  commodities: { [commodityId: UUID]: number };
  receivedAmount: number; //受け取った金額
  status: "pending" | "completed" | "cancelled";
};
