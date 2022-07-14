import React, { useState, ChangeEvent, FormEvent, useCallback } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import _ from "lodash";
import { useSearchUsersLazyQuery } from "@/graphql/generated";

import * as S from "./Search.style";
import Spinner from "../Spinner";

function Search() {
  const [input, setInput] = useState("");
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
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
    console.log("submit");
  };

  const isInputEmpty = input.length === 0;

  return (
    <S.Container isInputEmpty={isInputEmpty}>
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
          <S.Button type="submit" disabled={isInputEmpty}>
            <BiSearch size={25} className={isInputEmpty ? "search" : "search_active"} />
          </S.Button>
          {loading ? (
            <Spinner size={20} />
          ) : (
            <S.Button type="button" onClick={() => setInput("")}>
              <IoMdClose size={25} className="clean" />
            </S.Button>
          )}
        </S.ButtonContainer>
      </S.Form>
      {input && (
        <S.Recommandation>
          <ul>
            {data?.search.nodes?.map((value) => {
              if (value?.__typename === "User") {
                return (
                  <S.SearchItem key={value.id}>
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
