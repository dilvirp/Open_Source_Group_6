import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../Components/Login";
import "@testing-library/jest-dom";

test(`logs in with valid input`, async () => {
  render(<Login />);

  const emailAddressInput = screen.getByPlaceholderText(
    /Enter in your email address/i
  );
  const passwordInput = screen.getByPlaceholderText(/Enter in your password/i);
  const submitButton = screen.getByRole("button", { name: /login/i });

  fireEvent.change(emailAddressInput, {
    target: { value: "test123@test.com" },
  });
  fireEvent.change(passwordInput, { target: { value: "test123456" } });
  fireEvent.click(submitButton);

  expect(await screen.findByText(/login successful/i)).toBeInTheDocument();
});
