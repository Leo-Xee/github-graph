import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import useStoreTab from "@/hooks/useStoreTab";
import { FollowerList, FollowingList } from "./UserList";
import { CommonRepoList, StarredRepoList } from "./RepoList";

function ListContainer() {
  const { username } = useParams();
  const { tab, changeTab } = useStoreTab();

  useEffect(() => {
    changeTab("followings");
  }, [username]);

  if (tab === "followings") {
    return <FollowingList />;
  }

  if (tab === "followers") {
    return <FollowerList />;
  }

  if (tab === "repositories") {
    return <CommonRepoList />;
  }

  if (tab === "stars") {
    return <StarredRepoList />;
  }

  return null;
}

export default ListContainer;
