import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

const setKeyword = jest.fn();

it("검색 버튼을 클릭하면 입력값이 리셋된다.", async () => {
  render(<Search setKeyword={setKeyword} />);

  const input = screen.getByPlaceholderText("레포지토리명을 입력해주세요");
  const button = screen.getByRole("button", { name: /search/i });

  // input에 키워드 입력
  await userEvent.type(input, "facebook");
  expect(input).toHaveValue("facebook");

  // 검색 버튼 클릭
  await userEvent.click(button);

  // input 초기화
  expect(input).not.toBe("facebook");
});
