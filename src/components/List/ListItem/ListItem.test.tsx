import { render, screen } from "@testing-library/react";
import { Repo } from "api";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import MockDate from "mockdate";
import ListItem from "./ListItem";

dayjs.locale("ko");
dayjs.extend(relativeTime);
MockDate.set("2022-05-17T22:23:10Z"); // now

const repoData = {
  full_name: "vercel/vercel",
  description: "Develop. Preview. Ship.",
  open_issues_count: 186,
  updated_at: "2022-05-17T10:23:06Z",
} as Repo;

describe("<ListItem />", () => {
  it("레포지토리명, 설명, 이슈 개수 그리고 업데이트 시간을 보여준다", () => {
    render(<ListItem repo={repoData} />);

    const name = screen.getByText(/vercel\/vercel/i);
    const desc = screen.getByText(/Develop. Preview. Ship./i);
    const issues = screen.getByText(/186 issues/i);
    const dateFromNow = screen.getByText(/12시간 전/);

    expect(name).toBeInTheDocument();
    expect(desc).toBeInTheDocument();
    expect(issues).toBeInTheDocument();
    expect(dateFromNow).toBeInTheDocument();
  });
});
