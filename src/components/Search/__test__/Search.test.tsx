import React from "react";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import Search from "@/components/Search";
import { SearchUsersDocument } from "@/graphql/generated";

const mocks: ReadonlyArray<MockedResponse> = [
  {
    request: {
      query: SearchUsersDocument,
      variables: {
        keyword: "leo-xee",
      },
    },
    result: {
      data: {
        search: {
          nodes: [
            {
              id: "1",
              login: "Leo-Xee",
              name: "Jangmin Lee",
              avatarUrl:
                "https://avatars.githubusercontent.com/u/21965795?s=100&u=d5bd04940150788a2aa483bec04af776b26f5906&v=4",
            },
          ],
        },
      },
    },
  },
];

const setup = () => {
  const navigate = jest.fn();
  jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => navigate,
  }));

  const result = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <Search />
    </MockedProvider>,
    { wrapper: BrowserRouter },
  );

  return { result, navigate };
};

describe("<Search />", () => {
  it("검색창과 기본 버튼들을 보여준다.", () => {
    const { result } = setup();

    expect(result.getByRole("button", { name: /유저 검색/ })).toBeInTheDocument();
    expect(result.getByRole("button", { name: /입력한 유저명 삭제/ })).toBeInTheDocument();
    expect(result.getByPlaceholderText(/Github 유저를 검색해보세요/)).toBeInTheDocument();
  });

  it("유저명을 입력하면 로딩 상태를 보여준 후에 검색 추천리스트를 보여준다.", async () => {
    const { result } = setup();

    fireEvent.change(result.getByPlaceholderText(/Github 유저를 검색해보세요/), {
      target: { value: "leo-xee" },
    });
    expect(await result.findByLabelText(/로딩 중/)).toBeInTheDocument();
    expect(await result.findByRole("list")).toBeInTheDocument();
  });

  it("유저명을 입력하고 submit하면 해당 유저의 상세페이지로 이동한다.", async () => {
    const { result, navigate } = setup();

    fireEvent.change(result.getByPlaceholderText(/Github 유저를 검색해보세요/), {
      target: { value: "leo-xee" },
    });
    fireEvent.click(result.getByRole("button", { name: /유저 검색/ }));

    await waitFor(() => expect(navigate).toBeCalledWith("/users/leo-xee"));
  });
});
