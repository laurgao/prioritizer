import { render, screen } from "@testing-library/react";
import Header from "./components/Header";

test("renders header", () => {
  // render(<Header />);
  const { container } = render(<Header />);

  const linkElement = screen.getByText(/prioritizer/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toHaveClass("theme");

  // Expect we're using semantic html
  const header = container.querySelector("header");
  expect(header).toBeInTheDocument();
});
