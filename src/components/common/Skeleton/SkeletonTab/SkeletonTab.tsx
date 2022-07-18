import React from "react";

import * as S from "./SkeletonTab.style";

function SkeletonTab() {
  const tabs = ["following", "followers", "repositories", "stars"];

  return (
    <S.Container>
      {tabs.map((tab, idx) => (
        <S.Tab key={idx}>
          <S.Count />
          <S.Label>{tab}</S.Label>
        </S.Tab>
      ))}
    </S.Container>
  );
}

export default SkeletonTab;
