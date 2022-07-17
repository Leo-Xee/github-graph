import React from "react";
import { useParams } from "react-router-dom";

import Board from "@/components/Board";
import Search from "@/components/Search";

function UserDetail() {
  const { username } = useParams();

  return (
    <main>
      <Search />
      {username && <Board username={username} />}
    </main>
  );
}

export default UserDetail;
