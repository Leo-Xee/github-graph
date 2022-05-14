import { render, screen } from "@testing-library/react";
import HomePage from "./index";

it("Welcome message를 보여준다.", () => {
  render(<HomePage />);
  const element = screen.getByRole("heading", {
    name: "GitHub Finder",
  });
  expect(element).toBeInTheDocument();
});
