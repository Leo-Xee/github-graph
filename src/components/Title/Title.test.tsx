import { render, screen } from "@testing-library/react";
import Title from "./Title";

const title = "GitHub Finder";

it("타이틀을 보여준다.", () => {
  render(<Title title={title} />);

  const heading = screen.getByRole("heading", { name: "GitHub Finder" });
  expect(heading).toBeInTheDocument();
});
