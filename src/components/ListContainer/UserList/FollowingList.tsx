import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetFollowingsLazyQuery } from "@/graphql/generated";

import * as S from "./UserList.style";
import UserItem from "./UserItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import SkeletonUserList from "@/components/common/Skeleton/SkeletonUserList/SkeletonUserList";

function FollowingList() {
  const { username } = useParams();
  const [getFollowings, { data, loading, fetchMore }] = useGetFollowingsLazyQuery();

  const [targetRef] = useInfiniteScroll(
    loading,
    () =>
      fetchMore({
        variables: { username, after: data?.user?.following.pageInfo.endCursor },
      }),
    data?.user?.following.pageInfo.hasNextPage,
    [data],
  );

  useEffect(() => {
    if (username) {
      getFollowings({ variables: { username, after: null } });
    }
  }, [username]);

  return (
    <S.Container>
      {loading || !data ? (
        <SkeletonUserList />
      ) : (
        <S.List>
          {data?.user?.following.nodes?.map((user, idx) => {
            if (data.user?.following.nodes?.length === idx + 10) {
              return <UserItem key={idx} user={user} ref={targetRef} />;
            }
            return <UserItem key={idx} user={user} />;
          })}
        </S.List>
      )}
    </S.Container>
  );
}

export default FollowingList;
