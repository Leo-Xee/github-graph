import React from "react";

import * as S from "./Title.style";

function Title() {
  return (
    <S.Container>
      <S.Heading>GitHub Graph</S.Heading>
      <S.Description>GitHub 유저를 검색하고 그래프 뷰로 확인해보세요.</S.Description>
    </S.Container>
  );
}

export default Title;
