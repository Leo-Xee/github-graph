import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useGetStarsLazyQuery } from "@/graphql/generated";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import RepoItem from "./RepoItem";
import * as S from "../UserList/UserList.style";

function StarredRepoList() {
  const { username } = useParams();
  const [getStarredRepos, { data, loading, fetchMore }] = useGetStarsLazyQuery();

  const [targetRef] = useInfiniteScroll(
    loading,
    () =>
      fetchMore({
        variables: { username, after: data?.user?.starredRepositories.pageInfo.endCursor },
      }),
    data?.user?.starredRepositories.pageInfo.hasNextPage,
    [data],
  );

  useEffect(() => {
    if (username) {
      getStarredRepos({ variables: { username, after: null } });
    }
  }, [username]);

  return (
    <S.Container>
      <S.List>
        {data?.user?.starredRepositories.nodes?.map((repo, idx) => {
          if (data.user?.starredRepositories.nodes?.length === idx + 10) {
            return <RepoItem key={idx} repo={repo} ref={targetRef} />;
          }
          return <RepoItem key={idx} repo={repo} />;
        })}
      </S.List>
    </S.Container>
  );
}

export default StarredRepoList;
