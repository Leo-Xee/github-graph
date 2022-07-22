import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useGetUserLazyQuery } from "@/graphql/generated";

import Profile from "@/components/Profile";
import Search from "@/components/Search";
import Tab from "@/components/Tab";
import ListContainer from "@/components/ListContainer";

export const Board = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 410px;
  height: 100vh;
  padding-top: 90px;
  background-color: ${({ theme }) => theme["board-bg"]};
  box-shadow: ${({ theme }) => theme["box-shadow"]};
  overflow-y: scroll;
`;

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
  // console.log(username);

  return (
    <main>
      <Search />
      <Board>
        {error ? (
          <div>존재하지 않는 유저입니다.</div>
        ) : (
          <>
            <Profile userData={data} loading={loading} />
            <Tab userData={data} loading={loading} />
            <ListContainer />
          </>
        )}
      </Board>
    </main>
  );
}

export default UserDetail;
