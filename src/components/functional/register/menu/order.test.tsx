import { render, screen } from "@testing-library/react";
import Order from "./order";
import { UUID } from "crypto";
import { StallInfo } from "@/types/stallInfo";

const mockStallInfo: StallInfo = {
  name: "テスト店",
  commodities: {
    "1": { name: "Item 1", price: 10 },
    "2": { name: "Item 2", price: 20 },
  } as StallInfo["commodities"],
};

describe("Order", () => {
  test("should display the correct order items", () => {
    const currentOrder = { "1": 2, "2": 1 } as { [key: UUID]: number };
    render(
      <Order
        commodities={mockStallInfo.commodities}
        currentOrder={currentOrder}
        setCurrentOrder={jest.fn()}
      />
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  // test("should update the current order when a delete button is clicked", () => {
  //   const currentOrder = { "1": 2, "2": 1 };
  //   const setCurrentOrderMock = jest.fn();
  //   render(
  //     <Order
  //       stallInfo={mockStallInfo}
  //       currentOrder={currentOrder}
  //       setCurrentOrder={setCurrentOrderMock}
  //       receivedMoney={0}
  //       setReceivedMoney={jest.fn()}
  //     />
  //   );

  //   const deleteButton = screen.getAllByTestId("delete-order")[0];
  //   fireEvent.click(deleteButton);

  //   expect(setCurrentOrderMock).toHaveBeenCalledWith({ "2": 1 });
  // });

  // test("should display the correct total sum", () => {
  //   const currentOrder = { "1": 2, "2": 1 };
  //   render(
  //     <Order
  //       stallInfo={mockStallInfo}
  //       currentOrder={currentOrder}
  //       setCurrentOrder={jest.fn()}
  //       receivedMoney={0}
  //       setReceivedMoney={jest.fn()}
  //     />
  //   );

  //   expect(screen.getByText(40)).toBeInTheDocument();
  // });
});
