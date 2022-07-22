import React from "react";

import * as S from "./SkeletonUserList.style";

function SkeletonUserList() {
  return (
    <S.List>
      {Array.from({ length: 10 }).map((_, idx) => (
        <S.Item key={idx}>
          <S.ImageWrapper>
            <S.Image />
          </S.ImageWrapper>
          <S.Info>
            <S.Name />
            <S.Description />
            <S.InfoList>
              <S.InfoItem />
              <S.InfoItem />
            </S.InfoList>
          </S.Info>
        </S.Item>
      ))}
    </S.List>
  );
}

export default SkeletonUserList;
