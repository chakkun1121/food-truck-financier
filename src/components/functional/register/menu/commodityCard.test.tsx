import { render, screen, fireEvent } from "@testing-library/react";
import CommodityCard from "./commodityCard";

describe("CommodityCard", () => {
  test("should increase count when clicked on the commodity card", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard
        commodity={{ name: "Test Commodity", price: 10 }}
        count={0}
        setCount={setCountMock}
      />
    );

    const commodityCard = screen.getByText("Test Commodity");
    fireEvent.click(commodityCard);

    expect(setCountMock).toHaveBeenCalledWith(1);
  });

  test("should decrease count when minus button is clicked", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard
        commodity={{ name: "Test Commodity", price: 10 }}
        count={2}
        setCount={setCountMock}
      />
    );

    const minusButton = screen.getByLabelText("Minus");
    fireEvent.click(minusButton);

    expect(setCountMock).toHaveBeenCalledWith(1);
  });

  test("should not decrease count below 0", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard
        commodity={{ name: "Test Commodity", price: 10 }}
        count={0}
        setCount={setCountMock}
      />
    );

    const minusButton = screen.getByLabelText("Minus");
    fireEvent.click(minusButton);

    expect(setCountMock).not.toHaveBeenCalled();
  });

  test("should increase count when plus button is clicked", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard
        commodity={{ name: "Test Commodity", price: 10 }}
        count={2}
        setCount={setCountMock}
      />
    );

    const plusButton = screen.getByLabelText("Plus");
    fireEvent.click(plusButton);

    expect(setCountMock).toHaveBeenCalledWith(3);
  });
});
