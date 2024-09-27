import { fireEvent, render, screen } from "@testing-library/react";
import EditStockDialog from "./editStockDialog";

describe("EditStockDialog", () => {
  test("should open the dialog when trigger is clicked", () => {
    render(
      <EditStockDialog
        trigger={<button>Open Dialog</button>}
        name=""
        stock={0}
        setStock={jest.fn()}
        category=""
        categories={{}}
        setCategory={jest.fn()}
      />
    );

    const triggerElement = screen.getByText("Open Dialog");
    fireEvent.click(triggerElement);

    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeInTheDocument();
  });

  test("should close the dialog when cancel button is clicked", () => {
    render(
      <EditStockDialog
        trigger={<button>Open Dialog</button>}
        stock={0}
        setStock={jest.fn()}
        name=""
        category=""
        categories={{}}
        setCategory={jest.fn()}
      />
    );

    const triggerElement = screen.getByText("Open Dialog");
    fireEvent.click(triggerElement);

    const cancelButtonElement = screen.getByText("キャンセル");
    fireEvent.click(cancelButtonElement);

    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeInTheDocument();
  });

  test("should call setStock with the new stock value when save button is clicked", () => {
    const setStockMock = jest.fn();
    render(
      <EditStockDialog
        trigger={<button>Open Dialog</button>}
        stock={0}
        setStock={setStockMock}
        name=""
        category=""
        categories={{}}
        setCategory={jest.fn()}
      />
    );

    const triggerElement = screen.getByText("Open Dialog");
    fireEvent.click(triggerElement);

    const inputElement = screen.getByPlaceholderText("在庫数");
    fireEvent.change(inputElement, { target: { value: "10" } });

    const saveButtonElement = screen.getByText("保存");
    fireEvent.click(saveButtonElement);

    expect(setStockMock).toHaveBeenCalledWith(10);
  });
});
