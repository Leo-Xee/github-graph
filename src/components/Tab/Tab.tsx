import React from "react";
import { GetUserQuery } from "@/graphql/generated";

import * as S from "./Tab.style";
import SkeletonTab from "../common/Skeleton/SkeletonTab";
import useStoreTab from "@/hooks/useStoreTab";

type TabProps = {
  userData: GetUserQuery | undefined;
  loading: boolean;
};

function Tab({ userData, loading }: TabProps) {
  const { tab, changeTab } = useStoreTab();

  return (
    <S.Container>
      {loading || !userData ? (
        <SkeletonTab />
      ) : (
        <>
          <S.Tab isSelected={tab === "followings"} onClick={() => changeTab("followings")}>
            <div>{userData?.user?.following.totalCount}</div>
            <div>followings</div>
          </S.Tab>
          <S.Tab isSelected={tab === "followers"} onClick={() => changeTab("followers")}>
            <div>{userData?.user?.followers.totalCount}</div>
            <div>followers</div>
          </S.Tab>
          <S.Tab isSelected={tab === "repositories"} onClick={() => changeTab("repositories")}>
            <div>{userData?.user?.repositories.totalCount}</div>
            <div>repositories</div>
          </S.Tab>
          <S.Tab isSelected={tab === "stars"} onClick={() => changeTab("stars")}>
            <div>{userData?.user?.starredRepositories.totalCount}</div>
            <div>stars</div>
          </S.Tab>
        </>
      )}
    </S.Container>
  );
}

export default Tab;
