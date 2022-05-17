import { render, screen } from "@testing-library/react";
import Title from "./Title";

const title = "GitHub Finder";
const desc = "Github Repository를 검색하고 Issues를 확인할 수 있습니다.";

it("타이틀과 소개글을 보여준다.", () => {
  render(<Title title={title} description={desc} />);

  const heading = screen.getByRole("heading", { name: "GitHub Finder" });
  const description = screen.getByText("Github Repository를 검색하고 Issues를 확인할 수 있습니다.");

  expect(heading).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});
