import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import _ from "lodash";

import { useSearchUsersLazyQuery } from "@/graphql/generated";
import * as S from "./Search.style";
import Spinner from "../Spinner";

type SearchProps = {
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

function Search({ setUsername }: SearchProps) {
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [searchUser, { data, loading }] = useSearchUsersLazyQuery({
    variables: { keyword: input },
  });

  const debouncer = useCallback(_.debounce(searchUser, 500), []);

  const debounceFn = async (value: string) => {
    try {
      await debouncer({ variables: { keyword: value } });
    } catch (err) {
      alert("에러가 발생했습니다. 잠시후 다시 이용해주세요.");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    debounceFn(e.target.value);
    setIsActive(true);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUsername(input);
    setIsActive(false);
  };

  const onClickHandler = (username: string) => {
    setInput(username);
    setUsername(username);
    setIsActive(false);
  };

  const onCloseHanlder = () => {
    setInput("");
    setUsername("");
  };

  const isRecommandationActive = input.length !== 0 && isActive;

  return (
    <S.Container isActive={isRecommandationActive}>
      <S.Form onSubmit={onSubmitHandler}>
        <S.Lable>
          <S.Input
            type="text"
            placeholder="Github 유저를 검색해보세요"
            value={input}
            onChange={onChangeHandler}
          />
        </S.Lable>
        <S.ButtonContainer>
          <S.Button type="submit" disabled={input.length === 0}>
            <BiSearch size={25} className={isRecommandationActive ? "search_active" : "search"} />
          </S.Button>
          {loading ? (
            <Spinner size={20} />
          ) : (
            <S.Button type="button" onClick={() => onCloseHanlder()}>
              <IoMdClose size={25} className="clean" />
            </S.Button>
          )}
        </S.ButtonContainer>
      </S.Form>
      {isRecommandationActive && (
        <S.Recommandation>
          <ul>
            {data?.search.nodes?.map((value) => {
              if (value?.__typename === "User") {
                return (
                  <S.SearchItem key={value.id} onClick={() => onClickHandler(value.login)}>
                    <img src={value.avatarUrl} alt="Avatar" />
                    <p>
                      {value.login} {value.name && <span>({value.name})</span>}
                    </p>
                  </S.SearchItem>
                );
              }
              return null;
            })}
          </ul>
        </S.Recommandation>
      )}
    </S.Container>
  );
}

export default Search;
