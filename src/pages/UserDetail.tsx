import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { useGetUserLazyQuery } from "@/graphql/generated";

import Profile from "@/components/Profile";
import Search from "@/components/Search";
import Tab from "@/components/Tab";

export const Board = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 390px;
  height: 100vh;
  padding-top: 90px;
  background-color: ${({ theme }) => theme["search-bg"]};
  box-shadow: ${({ theme }) => theme["box-shadow"]};
`;

function UserDetail() {
  const { username } = useParams();
  const [getUser, { data, loading }] = useGetUserLazyQuery({
    variables: { username: username || "" },
  });

  useEffect(() => {
    if (username) {
      getUser();
      console.log("fetch");
    }
  }, [username]);

  return (
    <main>
      <Search />
      <Board>
        {username && <Profile userData={data} loading={loading} />}
        {username && <Tab userData={data} loading={loading} />}
      </Board>
    </main>
  );
}

export default UserDetail;
