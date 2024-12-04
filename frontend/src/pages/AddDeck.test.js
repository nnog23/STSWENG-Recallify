import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddDeck from "./AddDeck";

describe("AddDeck Component", () => {
  it("renders and handles inputs correctly", () => {
    const mockNavigate = jest.fn();
    render(<AddDeck navigate={mockNavigate} params={{ id: "123" }} />);

    const titleInput = screen.getByPlaceholderText("Enter the deck title");
    const descriptionInput = screen.getByPlaceholderText(
      "Enter a description (optional)"
    );
    const privateCheckbox = screen.getByLabelText("Private Deck");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(titleInput, { target: { value: "My New Deck" } });
    fireEvent.change(descriptionInput, {
      target: { value: "A description for my deck" },
    });
    fireEvent.click(privateCheckbox);
    fireEvent.click(submitButton);

    expect(mockNavigate).toHaveBeenCalledWith("/some-route");
    expect(titleInput.value).toBe("My New Deck");
    expect(descriptionInput.value).toBe("A description for my deck");
    expect(privateCheckbox.checked).toBe(true);
  });
});