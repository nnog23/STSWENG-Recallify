
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom"; // For navigation context
import EditDeck from "./EditDeck";

// Mock the useParams hook to simulate route params
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(() => ({ userId: "123", deckId: "456" })),
  useNavigate: jest.fn(() => jest.fn()), // Mock useNavigate
}));

// Mock fetch globally
global.fetch = jest.fn();

describe("EditDeck Component", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test

    // Mock fetch to return deck details
    fetch.mockResolvedValueOnce({
      json: () =>
        Promise.resolve({
          deck: { title: "Sample Deck", description: "Sample Description", private: true },
        }),
      status: 200,
    });
  });

  test("renders the EditDeck component and fetches deck details", async () => {
    render(
      <BrowserRouter>
        <EditDeck />
      </BrowserRouter>
    );    
    
    // Check if the title is rendered after fetching data
    expect(await screen.findByDisplayValue("Sample Deck")).toBeInTheDocument();

    // Check if the description is rendered after fetching data
    expect(screen.getByDisplayValue("Sample Description")).toBeInTheDocument();

    // Check if the private checkbox is checked
    expect(screen.getByLabelText("Private Deck")).toBeChecked();
  });

  test("handles input changes and form submission", async () => {
    render(
      <BrowserRouter>
        <EditDeck />
      </BrowserRouter>
    );

    // Wait for initial fetch
    await waitFor(() => screen.getByDisplayValue("Sample Deck"));

    // Simulate input changes
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Updated Title" } });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated Description" },
    });
    fireEvent.click(screen.getByLabelText("Private Deck")); // Toggle checkbox

    // Verify input changes
    expect(screen.getByLabelText("Title").value).toBe("Updated Title");
    expect(screen.getByLabelText("Description").value).toBe("Updated Description");
    expect(screen.getByLabelText("Private Deck")).not.toBeChecked();

    // Mock successful PUT request for form submission
    fetch.mockResolvedValueOnce({
      json: () => Promise.resolve({ success: true }),
      status: 200,
    });

    // Simulate form submission
    fireEvent.submit(screen.getByRole("button", { name: /update deck/i }));

    // Verify that the PUT request is sent with correct data
    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith(
        "http://localhost:8000/users/123/decks/456/editdeck",
        expect.objectContaining({
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Updated Title",
            description: "Updated Description",
            private: false,
            userId: "123",
          }),
        })
      )
    );
  });
});