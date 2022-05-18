import { render, screen } from "@testing-library/react";
import { Repo } from "api";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import MockDate from "mockdate";
import List from "./List";

dayjs.locale("ko");
dayjs.extend(relativeTime);
MockDate.set("2022-05-17T22:23:10Z"); // now

const repoListData = [
  {
    id: 1,
    full_name: "vercel/vercel",
    description: "Develop. Preview. Ship.",
    open_issues_count: 186,
    updated_at: "2022-05-17T10:23:06Z",
  },
  {
    id: 2,
    full_name: "vercel/micro",
    description: "Asynchronous HTTP microservices",
    open_issues_count: 11,
    updated_at: "2022-05-17T08:19:10Z",
  },
] as Repo[];

describe("<List />", () => {
  describe("로딩 중일 때", () => {
    it("repoList가 빈 배열인 경우에도 로딩 중임을 보여준다.", () => {
      render(<List repoList={[]} isLoading />);

      const loading = screen.getByTestId(/skeleton/i);
      expect(loading).toBeInTheDocument();
    });

    it("repoList가 빈 배열 아닌 경우에도 로딩 중임을 보여준다.", () => {
      render(<List repoList={repoListData} isLoading />);

      const loading = screen.getByTestId(/skeleton/i);
      expect(loading).toBeInTheDocument();
    });
  });

  describe("로딩 중이 아닐 때", () => {
    it("repoList가 빈 배열이면 '해당 키워드로 검색한 내용이 없습니다.'을 보여준다.", () => {
      render(<List repoList={[]} isLoading={false} />);

      const message = screen.getByText(/해당 키워드로 검색한 내용이 없습니다./);
      expect(message).toBeInTheDocument();
    });

    it("repoList가 빈 배열이 아니면 해당 키워드로 검색한 내용들을 보여준다.", () => {
      render(<List repoList={repoListData} isLoading={false} />);

      const name1 = screen.getByText(/vercel\/vercel/i);
      const desc1 = screen.getByText(/Develop. Preview. Ship./i);
      const issues1 = screen.getByText(/186 issues/i);
      const dateFromNow1 = screen.getByText(/12시간 전/);

      expect(name1).toBeInTheDocument();
      expect(desc1).toBeInTheDocument();
      expect(issues1).toBeInTheDocument();
      expect(dateFromNow1).toBeInTheDocument();

      const name = screen.getByText(/vercel\/micro/i);
      const desc = screen.getByText(/Asynchronous HTTP microservices/i);
      const issues = screen.getByText(/11 issues/i);
      const dateFromNow = screen.getByText(/14시간 전/);

      expect(name).toBeInTheDocument();
      expect(desc).toBeInTheDocument();
      expect(issues).toBeInTheDocument();
      expect(dateFromNow).toBeInTheDocument();
    });
  });
});
