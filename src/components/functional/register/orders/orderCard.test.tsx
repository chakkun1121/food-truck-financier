import { createUUID } from "@/lib/uuid";
import { OrderType, StallInfo } from "@/types/stallInfo";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import { UUID } from "crypto";
import OrderCard from "./orderCard";

describe("OrderCard", () => {
  const uuid = createUUID();
  const order: OrderType & { id: UUID } = {
    id: uuid,
    status: "pending",
    commodities: {
      "00000000-0000-0000-4000-000000000001": 2,
      "00000000-0000-0000-4000-000000000002": 3
    } as OrderType["commodities"],
    receivedAmount: 100,
    ticket: "T-0001"
  };

  const commodities: StallInfo["commodities"] = {
    "00000000-0000-0000-4000-000000000001": {
      name: "Commodity 1",
      price: 100,
      stock: 10
    },
    "00000000-0000-0000-4000-000000000002": {
      name: "Commodity 2",
      price: 200,
      stock: 10
    }
  };

  const setOrderStateMock = mock();

  beforeEach(() => {
    render(
      <OrderCard
        order={order}
        commodities={commodities}
        setOrderState={setOrderStateMock}
      />
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("should render order status badge", () => {
    const orderStatusElement = screen.getByText("pending");
    expect(orderStatusElement).toBeTruthy();
  });

  test("should render complete button when order status is pending", () => {
    const completeButtonElement = screen.getByText("準備完了");
    expect(completeButtonElement).toBeTruthy();
  });

  test("should render dropdown menu when order status is pending", () => {
    const dropdownMenuElement = screen.getByRole("button", {
      name: "More options"
    });
    expect(dropdownMenuElement).toBeTruthy();
  });

  test("should render commodities with their names and amounts", () => {
    const commodity1Element = screen.getByText("Commodity 1");
    const commodity2Element = screen.getByText("Commodity 2");
    const amount1Element = screen.getByText("2");
    const amount2Element = screen.getByText("3");

    expect(commodity1Element).toBeTruthy();
    expect(commodity2Element).toBeTruthy();
    expect(amount1Element).toBeTruthy();
    expect(amount2Element).toBeTruthy();
  });
  test("should not throw error when order are broken", () => {
    const brokenOrder = {
      status: "pending",
      receivedAmount: 100
    };
    render(
      <OrderCard
        order={brokenOrder as unknown as OrderType & { id: UUID }}
        commodities={commodities}
        setOrderState={setOrderStateMock}
      />
    );
    render(
      <OrderCard
        order={undefined as unknown as OrderType & { id: UUID }}
        commodities={commodities}
        setOrderState={setOrderStateMock}
      />
    );
  });
});
