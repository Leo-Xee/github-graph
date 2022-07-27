import React from "react";

import * as S from "./Title.style";

type TitleProps = {
  description: string;
};

function Title({ description }: TitleProps) {
  return (
    <S.Container>
      <S.Heading>GitHub Graph</S.Heading>
      <S.Description>{description}</S.Description>
    </S.Container>
  );
}

export default Title;
