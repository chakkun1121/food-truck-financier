import { createUUID } from "@/lib/uuid";
import { OrderType } from "@/types/stallInfo";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";
import OrderCard from "./orderCard";

describe("OrderCard", () => {
  const uuid = createUUID();
  const order: OrderType = {
    status: "pending",
    commodities: {
      "00000000-0000-0000-4000-000000000001": 2,
      "00000000-0000-0000-4000-000000000002": 3
    },
    receivedAmount: 100,
    ticket: "T-0001"
  };

  const setOrderStateMock = mock();

  beforeEach(() => {
    render(
      <OrderCard id={uuid} order={order} setOrderState={setOrderStateMock} />
    );
  });

  afterEach(() => {
    cleanup();
  });

  test("should render order ticket", () => {
    const orderTicketElement = screen.getByText("T-0001");
    expect(orderTicketElement).toBeTruthy();
  });

  test("should call setOrderState with 'completed' when button is clicked", () => {
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);
    expect(setOrderStateMock).toHaveBeenCalledWith(uuid, "completed");
  });

  test("should render button with correct class", () => {
    const buttonElement = screen.getByRole("button");
    expect(buttonElement.classList).toContain("max-w-52");
  });

  test("should render Card and CardContent components", () => {
    const cardElement = screen.getByRole("button").firstChild;
    expect(cardElement).toBeTruthy();
  });
});
