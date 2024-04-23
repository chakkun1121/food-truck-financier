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
  status: "pending" | "completed" | "cancelled";
};
