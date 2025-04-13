import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Profile from "../components/Profile";
import "@testing-library/jest-dom";

// Mock the fetch API
global.fetch = jest.fn();

describe("Profile Component", () => {
  const mockProfileData = {
    profilePicture: "https://example.com/profile.jpg",
    firstName: "John",
    lastName: "Doe",
    username: "johndoe",
    emailAddress: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    address: "123 Street, City",
    dateOfBirth: "1990-01-01",
    bio: "This is a test bio",
  };

  beforeEach(() => {
    fetch.mockClear();
    sessionStorage.setItem("token", "dummy-token"); // Set a mock token
  });

  afterEach(() => {
    sessionStorage.clear(); // Clear session storage after each test
  });

  it("renders loading state initially", () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfileData,
    });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading\.\.\./i)).toBeInTheDocument();
  });

  it("renders profile data after fetching", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfileData,
    });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Wait for profile data to render
    await waitFor(() => {
      expect(screen.getByText(/john doe/i)).toBeInTheDocument();
      expect(screen.getByText(/johndoe@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/123 street, city/i)).toBeInTheDocument();
      expect(screen.getByText(/this is a test bio/i)).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
    });

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Wait for error to render
    await waitFor(() => {
      expect(
        screen.getByText(/error 500: internal server error/i)
      ).toBeInTheDocument();
    });
  });

  it("redirects to login if no token is found", async () => {
    sessionStorage.removeItem("token"); // Remove token to simulate unauthenticated state
    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  it("navigates to update profile on button click", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockProfileData,
    });

    const mockNavigate = jest.fn();
    jest.spyOn(require("react-router-dom"), "useNavigate").mockImplementation(() => mockNavigate);

    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );

    // Wait for profile data to render
    await waitFor(() => {
      expect(screen.getByText(/edit profile/i)).toBeInTheDocument();
    });

    const editButton = screen.getByRole("button", { name: /edit profile/i });
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith("/update-profile");
  });
});