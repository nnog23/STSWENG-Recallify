
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AddCard from "./AddCard";

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  useParams: () => ({ userId: "123", deckId: "456" }), // Mocked userId and deckId
  useNavigate: () => jest.fn(), // Mocked navigate function
}));

describe("AddCard Component", () => {
  it("renders input fields and handles input changes", () => {
    render(<AddCard />);

    const frontInput = screen.getByPlaceholderText("Enter the front content");
    const backInput = screen.getByPlaceholderText("Enter the back content");
    const submitButton = screen.getByText("Add Card");

    // Check if input fields are in the document
    expect(frontInput).toBeInTheDocument();
    expect(backInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    // Simulate user typing in the fields
    fireEvent.change(frontInput, { target: { value: "Front content" } });
    fireEvent.change(backInput, { target: { value: "Back content" } });

    expect(frontInput.value).toBe("Front content");
    expect(backInput.value).toBe("Back content");
  });

  it("shows an error if fields are empty on submit", () => {
    render(<AddCard />);

const submitButton = screen.getByText("Add Card");
fireEvent.click(submitButton);

// Check if alert is called when fields are empty
expect(window.alert).toHaveBeenCalledWith("Both fields must be filled out.");
});

it("displays an error message if API request fails", async () => {
global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 400,
    json: () => Promise.resolve({ error: "Bad Request" }),
  })
);

render(<AddCard />);

const frontInput = screen.getByPlaceholderText("Enter the front content");
const backInput = screen.getByPlaceholderText("Enter the back content");
const submitButton = screen.getByText("Add Card");

fireEvent.change(frontInput, { target: { value: "Front content" } });
fireEvent.change(backInput, { target: { value: "Back content" } });
fireEvent.click(submitButton);

// Wait for error message to appear
await waitFor(() =>
  expect(screen.getByText("An error occurred while adding the card.")).toBeInTheDocument()
);
});

it("redirects after a successful API request", async () => {
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useParams: () => ({ userId: "123", deckId: "456" }),
  useNavigate: () => mockNavigate,
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    status: 201,
    json: () => Promise.resolve({ message: "Card added successfully!" }),
  })
);

render(<AddCard />);

const frontInput = screen.getByPlaceholderText("Enter the front content");
const backInput = screen.getByPlaceholderText("Enter the back content");
const submitButton = screen.getByText("Add Card");

fireEvent.change(frontInput, { target: { value: "Front content" } });
fireEvent.change(backInput, { target: { value: "Back content" } });
fireEvent.click(submitButton);

// Wait for navigation to be triggered
await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/users/123/decks/456"));
});
});