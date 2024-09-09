import { OrderType, StallInfo } from "@/types/stallInfo";
import { totalAmount } from "./totalAmount";

describe("totalAmount", () => {
  test("should return the correct total amount", () => {
    const commodities: StallInfo["commodities"] = {
      "0191b19b-5974-796f-b1a9-958108f5406a": {
        price: 100,
        name: "test1",
        stock: 10,
      },
      "0191b19b-a31d-7a69-9af4-9e2619d36460": {
        price: 200,
        name: "test2",
        stock: 20,
      },
    };

    const order: OrderType = {
      ticket: "T-0001",
      commodities: {
        "0191b19b-5974-796f-b1a9-958108f5406a": 2,
        "0191b19b-a31d-7a69-9af4-9e2619d36460": 3,
      },
      receivedAmount: 1000,
      status: "pending",
    };

    const result = totalAmount(commodities, order);

    expect(result).toEqual(800);
  });
});
