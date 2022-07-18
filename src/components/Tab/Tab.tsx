import React from "react";
import { GetUserQuery } from "@/graphql/generated";

import * as S from "./Tab.style";
import SkeletonTab from "../common/Skeleton/SkeletonTab";

type TabProps = {
  userData: GetUserQuery | undefined;
  loading: boolean;
};

function Tab({ userData, loading }: TabProps) {
  return (
    <S.Container>
      {loading || !userData ? (
        <SkeletonTab />
      ) : (
        <>
          <S.Tab>
            <div>{userData?.user?.following.totalCount}</div>
            <div>followings</div>
          </S.Tab>
          <S.Tab>
            <div>{userData?.user?.followers.totalCount}</div>
            <div>followers</div>
          </S.Tab>
          <S.Tab>
            <div>{userData?.user?.repositories.totalCount}</div>
            <div>repositories</div>
          </S.Tab>
          <S.Tab>
            <div>{userData?.user?.starredRepositories.totalCount}</div>
            <div>stars</div>
          </S.Tab>
        </>
      )}
    </S.Container>
  );
}

export default Tab;
