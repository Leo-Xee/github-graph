import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import useStore from "@/hooks/useStore";
import { FollowerList, FollowingList } from "./UserList";

function ListContainer() {
  const { username } = useParams();
  const { tab, changeTab } = useStore();

  useEffect(() => {
    changeTab("followings");
  }, [username]);

  if (tab === "followings") {
    return <FollowingList />;
  }

  if (tab === "followers") {
    return <FollowerList />;
  }

  return null;
}

export default ListContainer;
