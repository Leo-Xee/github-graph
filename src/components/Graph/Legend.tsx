import React from "react";
import { BsInfoCircleFill } from "react-icons/bs";

import * as S from "./Legend.style";
import useStore from "@/hooks/useStore";

function Legend() {
  const tab = useStore((state) => state.tab);

  const labelName = tab === "followings" || tab === "followers" ? "Follower 수" : "Star 개수";

  return (
    <S.Container>
      <S.List>
        <li>
          <S.Label color="#d6336c" /> <span>{labelName}가 1000 이상</span>
        </li>
        <li>
          <S.Label color="#ff922b" /> <span>{labelName}가 100 이상</span>
        </li>
        <li>
          <S.Label color="#12b886" /> <span>{labelName}가 100 미만</span>
        </li>
      </S.List>
      <S.Notice>
        <BsInfoCircleFill size={15} />
        <div>그래프 뷰는 최대 100개의 결과를 보여줍니다.</div>
      </S.Notice>
    </S.Container>
  );
}

export default Legend;
