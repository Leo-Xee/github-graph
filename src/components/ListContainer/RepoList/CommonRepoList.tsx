import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import * as S from "../UserList/UserList.style";
import { useGetReposLazyQuery } from "@/graphql/generated";
import RepoItem from "./RepoItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import SkeletonRepoList from "@/components/common/Skeleton/SkeletonRepoList";

function CommonRepoList() {
  const { username } = useParams();
  const [getRepos, { data, loading, fetchMore }] = useGetReposLazyQuery();

  const [targetRef] = useInfiniteScroll(
    loading,
    () =>
      fetchMore({
        variables: { username, after: data?.user?.repositories.pageInfo.endCursor },
      }),
    data?.user?.repositories.pageInfo.hasNextPage,
    [data],
  );

  useEffect(() => {
    if (username) {
      getRepos({ variables: { username, after: null } });
    }
  }, [username]);

  return (
    <S.Container>
      {loading || !data ? (
        <SkeletonRepoList />
      ) : (
        <S.List>
          {data?.user?.repositories.nodes?.map((repo, idx) => {
            if (data.user?.repositories.nodes?.length === idx + 10) {
              return <RepoItem key={idx} repo={repo} ref={targetRef} />;
            }
            return <RepoItem key={idx} repo={repo} />;
          })}
        </S.List>
      )}
    </S.Container>
  );
}

export default CommonRepoList;
