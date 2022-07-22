import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserLazyQuery } from "@/graphql/generated";

import Profile from "@/components/Profile";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import ListContainer from "@/components/ListContainer";
import * as S from "./UserDetail.style";

function UserDetail() {
  const { username } = useParams();
  const [getUser, { data, loading, error }] = useGetUserLazyQuery({
    variables: { username: username || "" },
  });

  useEffect(() => {
    if (username) {
      getUser();
    }
  }, [username]);

  return (
    <main>
      <Search />
      <S.Board>
        {error ? (
          <S.ErrorMessage>
            <b>{username}</b> 유저는 <br /> 존재하지 않는 유저입니다. ; (
          </S.ErrorMessage>
        ) : (
          <>
            <Profile userData={data} loading={loading} />
            <Tab userData={data} loading={loading} />
            <ListContainer />
          </>
        )}
      </S.Board>
    </main>
  );
}

export default UserDetail;
