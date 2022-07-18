import React, { useState, ChangeEvent, FormEvent, useCallback, useEffect } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";

import { useSearchUsersLazyQuery } from "@/graphql/generated";
import * as S from "./Search.style";
import Spinner from "@/components/common/Spinner";

function Search() {
  const navigate = useNavigate();
  const { username } = useParams();
  const [input, setInput] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [searchUser, { data, loading }] = useSearchUsersLazyQuery({
    variables: { keyword: input },
  });

  useEffect(() => {
    if (username) {
      setInput(username);
    }
  }, []);

  const debouncer = useCallback(_.debounce(searchUser, 500), []);

  const debounceFn = async (value: string) => {
    try {
      const a = await debouncer({ variables: { keyword: value } });
      console.log("db", a);
    } catch (err) {
      alert("에러가 발생했습니다. 잠시후 다시 이용해주세요.");
    }
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    setIsActive(true);
    debounceFn(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput(input);
    setIsActive(false);
    navigate(`/users/${input}`);
  };

  const onClickHandler = (name: string) => {
    setInput(name);
    setIsActive(false);
    navigate(`/users/${name}`);
  };

  const onCloseHanlder = () => {
    setInput("");
    navigate("/");
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
          <S.Button type="submit" aria-label="유저 검색" disabled={input.length === 0}>
            <BiSearch size={25} className={isRecommandationActive ? "search_active" : "search"} />
          </S.Button>
          {loading ? (
            <Spinner size={20} />
          ) : (
            <S.Button
              type="button"
              aria-label="입력한 유저명 삭제"
              onClick={() => onCloseHanlder()}
            >
              <IoMdClose size={25} className="clean" />
            </S.Button>
          )}
        </S.ButtonContainer>
      </S.Form>
      {isRecommandationActive && (
        <S.Recommandation>
          <ul aria-label="검색 추천리스트">
            {data?.search.nodes?.map((value) => {
              if (value?.__typename === "User") {
                return (
                  <S.SearchItem key={value.id}>
                    <button
                      type="button"
                      aria-label={`추천된 ${value.login} 검색 `}
                      onClick={() => onClickHandler(value.login)}
                    >
                      <img src={value.avatarUrl} alt="Avatar" />
                      <p>
                        {value.login} {value.name && <span>({value.name})</span>}
                      </p>
                    </button>
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
