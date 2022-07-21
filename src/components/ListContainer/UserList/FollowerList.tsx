import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import * as S from "./UserList.style";
import { useGetFollowersLazyQuery } from "@/graphql/generated";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import UserItem from "./UserItem";

function FollowerList() {
  const { username } = useParams();
  const [getFollowers, { data, loading, fetchMore }] = useGetFollowersLazyQuery();

  const [targetRef] = useInfiniteScroll(
    loading,
    () =>
      fetchMore({
        variables: { username, after: data?.user?.followers.pageInfo.endCursor },
      }),
    data?.user?.followers.pageInfo.hasNextPage,
    [data],
  );

  useEffect(() => {
    if (username) {
      getFollowers({ variables: { username, after: null } });
    }
  }, [username]);

  return (
    <S.Container>
      <S.List>
        {data?.user?.followers.nodes?.map((user, idx) => {
          if (data.user?.followers.nodes?.length === idx + 10) {
            return <UserItem key={idx} user={user} ref={targetRef} />;
          }
          return <UserItem key={idx} user={user} />;
        })}
      </S.List>
    </S.Container>
  );
}

export default FollowerList;
