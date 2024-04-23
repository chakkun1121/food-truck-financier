import { render, screen, fireEvent } from "@testing-library/react";
import KeyPad from "./keypad";

describe("KeyPad", () => {
  test("should call onChange with the correct value when input value changes", () => {
    const onChangeMock = jest.fn();
    render(<KeyPad onChange={onChangeMock} />);

    const inputElement = screen.getByPlaceholderText("金額を入力");
    fireEvent.change(inputElement, { target: { value: "123" } });

    expect(onChangeMock).toHaveBeenCalledWith(123);
  });

  test("should update the input value when a button is clicked", () => {
    render(<KeyPad />);

    const inputElement = screen.getByPlaceholderText("金額を入力");
    const buttonElement = screen.getByText("1");
    fireEvent.click(buttonElement);

    expect(inputElement).toHaveValue(1);
  });
  test("should update the input value when buttons is clicked", () => {
    render(<KeyPad />);

    const inputElement = screen.getByPlaceholderText("金額を入力");
    const buttonElement = screen.getByText("1");
    fireEvent.click(buttonElement);
    const buttonElement2 = screen.getByText("2");
    fireEvent.click(buttonElement2);

    expect(inputElement).toHaveValue(12);
  });
  test("delete the last digit when backspace is clicked", () => {
    render(<KeyPad />);

    const inputElement = screen.getByPlaceholderText("金額を入力");
    const buttonElement = screen.getByText("1");
    fireEvent.click(buttonElement);
    const buttonElement2 = screen.getByText("2");
    fireEvent.click(buttonElement2);
    const backspaceElement = screen.getByTestId("backspace");
    fireEvent.click(backspaceElement);

    expect(inputElement).toHaveValue(1);
  });
});
