import { UUID } from "crypto";

export type StallInfo = {
  name: string;
  commodities?: {
    [key: UUID]: {
      name: string;
      price: number;
    };
  };
};
