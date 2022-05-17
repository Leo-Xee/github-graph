import React, { useRef } from "react";
import { FiSearch } from "react-icons/fi";

import * as S from "./style";

type SearchProps = {
  setKeyword: React.Dispatch<React.SetStateAction<string>>;
};

function Search({ setKeyword }: SearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const searchHandler = () => {
    if (inputRef.current?.value) {
      setKeyword(inputRef.current.value);
      inputRef.current.value = "";
    }
  };

  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchHandler();
    }
  };

  return (
    <S.SearchBar>
      <label htmlFor="repo" />
      <S.Input
        id="repo"
        type="text"
        placeholder="키워드를 입력해주세요"
        ref={inputRef}
        onKeyDown={onKeyDownHandler}
      />
      <S.Button type="button" onClick={searchHandler} aria-label="search">
        <FiSearch size={25} />
      </S.Button>
    </S.SearchBar>
  );
}

export default Search;
