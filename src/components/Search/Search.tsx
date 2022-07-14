import React, { useState, ChangeEvent, FormEvent } from "react";
import { BiSearch } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import * as S from "./Search.style";

function Search() {
  const [input, setInput] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <S.Container>
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
          <S.Button type="submit" disabled={!input}>
            <BiSearch
              size={25}
              className={!input ? "search" : "search_active"}
            />
          </S.Button>
          <S.Button type="button" onClick={() => setInput("")}>
            <IoMdClose size={25} className="clean" />
          </S.Button>
        </S.ButtonContainer>
      </S.Form>
    </S.Container>
  );
}

export default Search;
