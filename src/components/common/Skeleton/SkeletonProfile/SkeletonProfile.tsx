import React from "react";

import * as S from "./SkeletonProfile.style";

function SkeletonProfile() {
  return (
    <S.Container>
      <S.ImageWrapper>
        <S.Image />
      </S.ImageWrapper>
      <S.Info>
        <S.Title />
        <S.List />
        <S.List />
        <S.List />
      </S.Info>
    </S.Container>
  );
}

export default SkeletonProfile;
