import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";
import { afterEach, describe, expect, mock, test } from "bun:test";
import EditStockDialog from "./editStockDialog";

describe("EditStockDialog", () => {
  afterEach(() => {
    cleanup();
  });

  test("should open the dialog when trigger is clicked", () => {
    render(
      <EditStockDialog
        trigger={<button>Open Dialog</button>}
        name=""
        stock={0}
        setStock={mock()}
        category=""
        categories={{}}
        setCategory={mock()}
      />
    );

    const triggerElement = screen.getByText("Open Dialog");
    fireEvent.click(triggerElement);

    const dialogElement = screen.getByRole("dialog");
    expect(dialogElement).toBeTruthy();
  });

  test("should close the dialog when cancel button is clicked", () => {
    render(
      <EditStockDialog
        trigger={<button>Open Dialog</button>}
        stock={0}
        setStock={mock()}
        name=""
        category=""
        categories={{}}
        setCategory={mock()}
      />
    );

    const triggerElement = screen.getByText("Open Dialog");
    fireEvent.click(triggerElement);

    const cancelButtonElement = screen.getByText("キャンセル");
    fireEvent.click(cancelButtonElement);

    const dialogElement = screen.queryByRole("dialog");
    expect(dialogElement).not.toBeTruthy();
  });

  test("should call setStock with the new stock value when save button is clicked", async () => {
    const setStockMock = mock();
    render(
      <EditStockDialog
        trigger={<button>Open Dialog</button>}
        stock={0}
        setStock={setStockMock}
        name=""
        category=""
        categories={{}}
        setCategory={mock()}
      />
    );

    const triggerElement = screen.getByText("Open Dialog");
    fireEvent.click(triggerElement);

    const inputElement = screen.getByPlaceholderText("在庫数");
    fireEvent.change(inputElement, { target: { value: "10" } });

    const saveButtonElement = screen.getByText("保存");
    fireEvent.click(saveButtonElement);

    await waitFor(() => {
      expect(setStockMock).toHaveBeenCalledWith(10);
    });
  });
});
