import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import * as S from "../UserList/UserList.style";
import { useGetRepositoriesLazyQuery } from "@/graphql/generated";
import RepoItem from "./RepoItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";

function CommonRepoList() {
  const { username } = useParams();
  const [getRepos, { data, loading, fetchMore }] = useGetRepositoriesLazyQuery();

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
      <S.List>
        {data?.user?.repositories.nodes?.map((repo, idx) => {
          if (data.user?.repositories.nodes?.length === idx + 10) {
            return <RepoItem key={idx} repo={repo} ref={targetRef} />;
          }
          return <RepoItem key={idx} repo={repo} />;
        })}
      </S.List>
    </S.Container>
  );
}

export default CommonRepoList;
