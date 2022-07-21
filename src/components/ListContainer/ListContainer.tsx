import React from "react";

import useStore from "@/hooks/useStore";
import { FollowerList, FollowingList } from "./UserList";

function ListContainer() {
  const tab = useStore((state) => state.tab);

  if (tab === "followings") {
    return <FollowingList />;
  }

  if (tab === "followers") {
    return <FollowerList />;
  }

  return null;
}

export default ListContainer;
