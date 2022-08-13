import { render, screen } from "@testing-library/react";
import Footer from "./components/Footer";

test("renders footer", () => {
  const { container } = render(<Footer />);

  const philosophy = screen.getByText("Philosophy").closest("a");
  expect(philosophy).toHaveAttribute("href", "https://github.com/laurgao/prioritizer/blob/main/README.md");
  expect(philosophy).toHaveAttribute("target", "_blank");

  // Expect we're using semantic html
  const footer = container.querySelector("footer");
  expect(footer).toBeInTheDocument();
});
