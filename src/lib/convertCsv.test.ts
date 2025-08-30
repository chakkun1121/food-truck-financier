import { OrderType, StallInfo } from "@/types/stallInfo";
import { describe, expect, test } from "bun:test";
import { convertCsv } from "./convertCsv";

describe("convertCsv", () => {
  test("should return the correct CSV string", () => {
    const ids = [
      "0191b19b-5974-796f-b1a9-958108f5406a",
      "0191b19b-a31d-7a69-9af4-9e2619d36460",
      "0191b19c-a442-7d13-a20d-4872c907aebf",
      "0191b19c-c8f8-7913-94a4-827257326627"
    ];
    const commodities: StallInfo["commodities"] = {
      [ids[0]]: { price: 100, name: "test1", stock: 10 },
      [ids[1]]: { price: 200, name: "test2", stock: 20 }
    };

    const orders: { [key: string]: OrderType } = {
      [ids[2]]: {
        ticket: "T-0001",
        commodities: {
          [ids[0]]: 2, // 計200円
          [ids[1]]: 3 // 600円
        },
        receivedAmount: 1000,
        // お釣り200円
        status: "pending"
      },
      [ids[3]]: {
        ticket: "order-2",
        commodities: {
          [ids[0]]: 1, // 計100円
          [ids[1]]: 2 // 400円
        },
        receivedAmount: 500,
        // お釣りなし
        status: "completed"
      }
    };

    const expectedCsv = [
      [
        "注文番号",
        "合計金額",
        "注文日時",
        "受取日時",
        "ステータス",
        "注文商品"
      ],
      [
        "T-0001",
        "800",
        "2024/9/2 16:21:58",
        "",
        "pending",
        "test1 test1 test2 test2 test2"
      ],
      [
        "order-2",
        "500",
        "2024/9/2 16:22:07",
        "",
        "completed",
        "test1 test2 test2"
      ],
      [],
      ["商品名", "販売個数", "在庫数"],
      ["test1", "3", "10"],
      ["test2", "5", "20"]
    ]
      .map(row => row.join(","))
      .join("\n");

    const csv = convertCsv(commodities, orders);

    expect(csv).toEqual(expectedCsv);
  });
  test("should return empty string when orders is empty", () => {
    const expectedCsv = "";
    const csv = convertCsv(null!, null!);
    expect(csv).toEqual(expectedCsv);
  });
  test("should handle commodities with spaces and commas in their names", () => {
    const ids = [
      "0191b19b-5974-796f-b1a9-958108f5406a",
      "0191b19b-a31d-7a69-9af4-9e2619d36460"
    ];
    const commodities: StallInfo["commodities"] = {
      [ids[0]]: { price: 100, name: "test 1", stock: 10 },
      [ids[1]]: { price: 200, name: "test, 2", stock: 20 }
    };

    const orders: { [key: string]: OrderType } = {
      "0191b19c-a442-7d13-a20d-4872c907aebf": {
        ticket: "T-0001",
        commodities: {
          [ids[0]]: 2,
          [ids[1]]: 3
        },
        receivedAmount: 1000,
        status: "pending"
      }
    };

    const expectedCsv = [
      [
        "注文番号",
        "合計金額",
        "注文日時",
        "受取日時",
        "ステータス",
        "注文商品"
      ],
      [
        "T-0001",
        "800",
        "2024/9/2 16:21:58",
        "",
        "pending",
        "test_1 test_1 test_2 test_2 test_2"
      ],
      [],
      ["商品名", "販売個数", "在庫数"],
      ["test_1", "2", "10"],
      ["test_2", "3", "20"]
    ]
      .map(row => row.join(","))
      .join("\n");

    const csv = convertCsv(commodities, orders);

    expect(csv).toEqual(expectedCsv);
  });
});
