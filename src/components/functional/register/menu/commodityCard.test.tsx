import { CommodityType } from "@/types/stallInfo";
import { fireEvent, render, screen } from "@testing-library/react";
import CommodityCard from "./commodityCard";

describe("CommodityCard", () => {
  const commodity: CommodityType = {
    name: "Test Commodity",
    price: 10,
    stock: 10
  };
  test("should increase count when clicked on the commodity card", () => {
    const setCountMock = jest.fn();

    render(
      <CommodityCard commodity={commodity} count={0} setCount={setCountMock} />
    );

    const commodityCard = screen.getByText("Test Commodity");
    fireEvent.click(commodityCard);

    expect(setCountMock).toHaveBeenCalledWith(1);
  });

  test("should decrease count when minus button is clicked", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard commodity={commodity} count={2} setCount={setCountMock} />
    );

    const minusButton = screen.getByLabelText("Minus");
    fireEvent.click(minusButton);

    expect(setCountMock).toHaveBeenCalledWith(1);
  });

  test("should not decrease count below 0", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard commodity={commodity} count={0} setCount={setCountMock} />
    );

    const minusButton = screen.getByLabelText("Minus");
    fireEvent.click(minusButton);

    expect(setCountMock).not.toHaveBeenCalled();
  });

  test("should increase count when plus button is clicked", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard commodity={commodity} count={2} setCount={setCountMock} />
    );

    const plusButton = screen.getByLabelText("Plus");
    fireEvent.click(plusButton);

    expect(setCountMock).toHaveBeenCalledWith(3);
  });
  test("should not increase count above stock", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard commodity={commodity} count={10} setCount={setCountMock} />
    );

    const plusButton = screen.getByLabelText("Plus");
    fireEvent.click(plusButton);

    expect(setCountMock).not.toHaveBeenCalled();
  });
  test("should not increase count if stock is 0 or less", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard
        commodity={{ ...commodity, stock: -1 }}
        count={0}
        setCount={setCountMock}
      />
    );

    const plusButton = screen.getByLabelText("Plus");
    fireEvent.click(plusButton);

    expect(setCountMock).not.toHaveBeenCalled();
  });
  test("should not throw an error if the commodity is broken", () => {
    const setCountMock = jest.fn();
    render(
      <CommodityCard
        commodity={null as unknown as CommodityType}
        count={0}
        setCount={setCountMock}
      />
    );
  });
});
