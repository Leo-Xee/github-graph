import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Search from "./Search";

const setKeyword = jest.fn();
const placeholder = "키워드를 입력해주세요";

describe("<Search />", () => {
  beforeEach(() => {
    render(<Search setKeyword={setKeyword} />);
  });

  it("검색창이 보여진다.", () => {
    const input = screen.getByPlaceholderText(placeholder);
    const button = screen.getByRole("button", { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("엔터키를 누르면 입력값이 리셋된다.", async () => {
    const input = screen.getByPlaceholderText(placeholder);

    await userEvent.type(input, "facebook");
    expect(input).toHaveValue("facebook");

    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    expect(input).not.toHaveValue("facebook");
  });

  it("검색 버튼을 클릭하면 입력값이 리셋된다.", async () => {
    const input = screen.getByPlaceholderText(placeholder);
    const button = screen.getByRole("button", { name: /search/i });

    await userEvent.type(input, "facebook");
    expect(input).toHaveValue("facebook");

    await userEvent.click(button);
    expect(input).not.toHaveValue("facebook");
  });
});
