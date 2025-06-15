import { CommodityType } from "@/types/stallInfo";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, mock, test } from "bun:test";
import CommodityCard from "./commodityCard";

describe("CommodityCard", () => {
  const commodity: CommodityType = {
    name: "Test Commodity",
    price: 10,
    stock: 10
  };

  afterEach(() => {
    cleanup();
  });

  test("should increase count when clicked on the commodity card", () => {
    const setCountMock = mock();

    render(
      <CommodityCard commodity={commodity} count={0} setCount={setCountMock} />
    );

    const commodityCard = screen.getByText("Test Commodity");
    fireEvent.click(commodityCard);

    expect(setCountMock).toHaveBeenCalledTimes(1);
    expect(setCountMock).toHaveBeenCalledWith(1);
  });

  test("should decrease count when minus button is clicked", () => {
    const setCountMock = mock();

    render(
      <CommodityCard commodity={commodity} count={2} setCount={setCountMock} />
    );

    const minusButton = screen.getByLabelText("Minus");
    fireEvent.click(minusButton);

    expect(setCountMock).toHaveBeenCalledTimes(1);
    expect(setCountMock).toHaveBeenCalledWith(1);
  });

  test("should not decrease count below 0", () => {
    const setCountMock = mock();
    render(
      <CommodityCard commodity={commodity} count={0} setCount={setCountMock} />
    );

    const minusButton = screen.getByLabelText("Minus");
    fireEvent.click(minusButton);

    expect(setCountMock).not.toHaveBeenCalled();
  });

  test("should increase count when plus button is clicked", () => {
    const setCountMock = mock();
    render(
      <CommodityCard commodity={commodity} count={2} setCount={setCountMock} />
    );

    const plusButton = screen.getByLabelText("Plus");
    fireEvent.click(plusButton);

    expect(setCountMock).toHaveBeenCalledTimes(1);
    expect(setCountMock).toHaveBeenCalledWith(3);
  });

  test("should not increase count above stock", () => {
    const setCountMock = mock();
    render(
      <CommodityCard commodity={commodity} count={10} setCount={setCountMock} />
    );

    const plusButton = screen.getByLabelText("Plus");
    fireEvent.click(plusButton);

    expect(setCountMock).not.toHaveBeenCalled();
  });

  test("should not increase count if stock is 0 or less", () => {
    const setCountMock = mock();
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
    const setCountMock = mock();
    render(
      <CommodityCard
        commodity={null as unknown as CommodityType}
        count={0}
        setCount={setCountMock}
      />
    );
  });

  test("should display the current count number", () => {
    const setCountMock = mock();
    render(
      <CommodityCard commodity={commodity} count={5} setCount={setCountMock} />
    );
    expect(screen.getByText("5")).toBeTruthy();
  });

  test("should change style when item is selected (count > 0)", () => {
    const { container, rerender } = render(
      <CommodityCard commodity={commodity} count={0} setCount={mock()} />
    );
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement.className).not.toContain("bg-primary");
    rerender(
      <CommodityCard commodity={commodity} count={1} setCount={mock()} />
    );
    expect(cardElement.className).toContain("bg-primary");
  });

  test("should apply warning style when stock is 10 or less", () => {
    const lowStockCommodity = { ...commodity, stock: 9 };
    render(
      <CommodityCard
        commodity={lowStockCommodity}
        count={0}
        setCount={mock()}
      />
    );
    const stockText = screen.getByText(`在庫:${lowStockCommodity.stock}`);
    expect(stockText.className).toContain("text-destructive");
  });

  test("should apply opacity style when count reaches stock", () => {
    const { container } = render(
      <CommodityCard commodity={commodity} count={10} setCount={mock()} />
    );
    const cardElement = container.firstChild as HTMLElement;
    expect(cardElement.className).toContain("opacity-50");
  });

  test("minus button should be disabled when count is 0", () => {
    render(<CommodityCard commodity={commodity} count={0} setCount={mock()} />);
    const minusButton = screen.getByLabelText("Minus");
    expect(minusButton.disabled).toBe(true);
  });

  test("plus button should be disabled when count is equal to stock", () => {
    render(
      <CommodityCard commodity={commodity} count={10} setCount={mock()} />
    );
    const plusButton = screen.getByLabelText("Plus");
    expect(plusButton.disabled).toBe(true);
  });

  test("should not increase count by clicking card when count is equal to stock", () => {
    const setCountMock = mock();
    render(
      <CommodityCard commodity={commodity} count={10} setCount={setCountMock} />
    );
    const commodityCard = screen.getByText("Test Commodity");
    fireEvent.click(commodityCard);
    expect(setCountMock).not.toHaveBeenCalled();
  });

  test("should render gracefully with partial commodity data", () => {
    const partialCommodity = { name: "Partial Item" };
    render(
      <CommodityCard commodity={partialCommodity} count={0} setCount={mock()} />
    );

    expect(screen.getByText("Partial Item")).toBeTruthy();
    expect(screen.getByText(/円/).textContent).toContain(" 円");
    expect(screen.getByText(/在庫:/).textContent).toContain("在庫:");
  });

  test("should apply custom styles when a category is provided", () => {
    const category = {
      id: "cat1",
      name: "Drinks",
      color: { bg: "#0000ff", text: "#ffffff", border: "#0000ff" }
    };
    const { container } = render(
      <CommodityCard
        commodity={commodity}
        count={1}
        setCount={mock()}
        category={category}
      />
    );
    const cardElement = container.firstChild as HTMLElement;

    expect(cardElement.className).toContain("bg-[#0000ff]");
    expect(cardElement.className).toContain("border-[#0000ff]");
  });
});
describe("when commodity stock is undefined", () => {
  const commodityWithoutStock = {
    name: "Stock undefined commodity",
    price: 100
  };

  afterEach(() => {
    cleanup();
  });

  test("plus button should be disabled", () => {
    render(
      <CommodityCard
        commodity={commodityWithoutStock}
        count={0}
        setCount={mock()}
      />
    );
    const plusButton = screen.getByLabelText("Plus");
    expect(plusButton.disabled).toBe(true);
  });

  test("should not increase count when card is clicked", () => {
    const setCountMock = mock();
    render(
      <CommodityCard
        commodity={commodityWithoutStock}
        count={0}
        setCount={setCountMock}
      />
    );
    const card = screen.getByText("Stock undefined commodity");
    fireEvent.click(card);

    expect(setCountMock).not.toHaveBeenCalled();
  });
});
