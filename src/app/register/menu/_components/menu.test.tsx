import { StallInfo } from "@/types/stallInfo";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, mock } from "bun:test";
import Menu from "./menu";

const mockCommodities: StallInfo["commodities"] = {
  item1: { name: "Item 1", price: 100, stock: 10 },
  item2: { name: "Item 2", price: 200, stock: 10 }
};

describe("Menu Component", () => {
  it("renders the commodities", () => {
    render(
      <Menu
        commodities={mockCommodities}
        currentOrder={{}}
        setCurrentOrder={mock()}
      />
    );
    expect(screen.getByText("Item 1")).toBeTruthy();
    expect(screen.getByText("Item 2")).toBeTruthy();
  });
});
