import { render, screen } from "@testing-library/react";
import Home from "../components/Home";
import "@testing-library/jest-dom";

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, bookTitle: "The Hobbit", author: "J.R.R. Tolkien" },
        ]),
    })
  );
});

test("shows book title from API", async () => {
  render(<Home />);
  const title = await screen.findByText("The Hobbit");
  expect(title).toBeInTheDocument();
});
