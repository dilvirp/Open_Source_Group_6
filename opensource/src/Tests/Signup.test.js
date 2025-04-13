import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "../components/Signup";
import "@testing-library/jest-dom";

test("renders signup and submits form", async () => {
  render(<Signup />);

  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: "test@email.com" },
  });

  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "Password123" },
  });

  fireEvent.click(screen.getByRole("button", { name: /sign up/i }));
});
