import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useStore from "@/hooks/useStore";
import { useGetFollowingsLazyQuery } from "@/graphql/generated";
import * as S from "./List.style";
import UserItem from "./UserItem";

function List() {
  const { username } = useParams();
  const tab = useStore((state) => state.tab);
  const [getFollowings, { data, loading }] = useGetFollowingsLazyQuery({
    variables: { username: username || "" },
  });

  useEffect(() => {
    if (username) {
      getFollowings();
    }
  }, [username]);

  console.log(data);

  return (
    <S.Container>
      <S.List>
        {data?.user?.following.nodes?.map((user) => (
          <UserItem key={user?.login} user={user} />
        ))}
      </S.List>
    </S.Container>
  );
}

export default List;
