import { render, screen, fireEvent } from "@testing-library/react";
import OrderCard from "./orderCard";
import { OrderType } from "@/types/stallInfo";
import { UUID } from "crypto";

describe("OrderCard", () => {
  const order: OrderType & { id: UUID; index: number } = {
    id: "123" as UUID,
    index: 1,
    status: "pending",
    commodities: {
      commodity1: 2,
      commodity2: 3,
    } as OrderType["commodities"],
    receivedAmount: 100,
  };

  const commodities = {
    commodity1: { name: "Commodity 1" },
    commodity2: { name: "Commodity 2" },
  };

  const setOrderStateMock = jest.fn();

  beforeEach(() => {
    render(
      <OrderCard
        order={order}
        commodities={commodities}
        setOrderState={setOrderStateMock}
      />
    );
  });

  test("should render order index", () => {
    const orderIndexElement = screen.getByText("1");
    expect(orderIndexElement).toBeInTheDocument();
  });

  test("should render order status badge", () => {
    const orderStatusElement = screen.getByText("pending");
    expect(orderStatusElement).toBeInTheDocument();
  });

  test("should render complete button when order status is pending", () => {
    const completeButtonElement = screen.getByLabelText("complete");
    expect(completeButtonElement).toBeInTheDocument();
  });

  test("should call setOrderState with 'completed' when complete button is clicked", () => {
    const completeButtonElement = screen.getByLabelText("complete");
    fireEvent.click(completeButtonElement);
    expect(setOrderStateMock).toHaveBeenCalledWith("completed");
  });

  test("should render dropdown menu when order status is pending", () => {
    const dropdownMenuElement = screen.getByRole("button", {
      name: "More options",
    });
    expect(dropdownMenuElement).toBeInTheDocument();
  });

  // test("should call setOrderState with 'cancelled' when cancel option is clicked in dropdown menu", () => {
  //   const dropdownMenuElement = screen.getByRole("button", {
  //     name: "More options",
  //   });
  //   fireEvent.click(dropdownMenuElement);

  //   const cancelOptionElement = screen.getByText("キャンセル");
  //   fireEvent.click(cancelOptionElement);

  //   expect(setOrderStateMock).toHaveBeenCalledWith("cancelled");
  // });

  test("should render commodities with their names and amounts", () => {
    const commodity1Element = screen.getByText("Commodity 1");
    const commodity2Element = screen.getByText("Commodity 2");
    const amount1Element = screen.getByText("2");
    const amount2Element = screen.getByText("3");

    expect(commodity1Element).toBeInTheDocument();
    expect(commodity2Element).toBeInTheDocument();
    expect(amount1Element).toBeInTheDocument();
    expect(amount2Element).toBeInTheDocument();
  });

  // test("should render total points and received amount", () => {
  //   const totalPointsElement = screen.getByText(5);
  //   const receivedAmountElement = screen.getByText("100円");

  //   expect(totalPointsElement).toBeInTheDocument();
  //   expect(receivedAmountElement).toBeInTheDocument();
  // });
});
