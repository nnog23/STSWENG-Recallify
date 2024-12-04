import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // Wrap with BrowserRouter for navigation
import DeleteDeck from "./DeleteDeck";

// Mock the useParams hook to simulate route params
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ userId: "123", deckId: "456" })),
  useNavigate: jest.fn(() => jest.fn()), // Mock useNavigate
}));

// Mock fetch globally
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ deck: { title: "Sample Deck" } }),
    status: 200,
  })
);

describe("DeleteDeck Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test("renders the DeleteDeck component", async () => {
    render(
      <BrowserRouter>
        <DeleteDeck />
      </BrowserRouter>
    );

    // Check if the title is rendered
    expect(await screen.findByText("Delete Deck: Sample Deck")).toBeInTheDocument();

    // Check if the confirmation input is present
    expect(screen.getByPlaceholderText("Type 'DELETE' to confirm")).toBeInTheDocument();

    // Check if the delete button is present
    expect(screen.getByText("Delete Deck")).toBeInTheDocument();
  });

  test("handles input change for confirmation", () => {
    render(
      <BrowserRouter>
        <DeleteDeck />
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText("Type 'DELETE' to confirm");
    fireEvent.change(input, { target: { value: "DELETE" } });

    expect(input.value).toBe("DELETE");
  });
});