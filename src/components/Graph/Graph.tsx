import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { BaseData } from "graph";
import {
  GetUserQuery,
  useGetFollowersForGraphLazyQuery,
  useGetFollowingsForGraphLazyQuery,
  useGetReposForGraphLazyQuery,
  useGetStarsForGraphLazyQuery,
} from "@/graphql/generated";
import runForceGraph from "../../shared/utils/runForceGraph";
import useStore from "@/hooks/useStore";
import Spinner from "../common/Spinner";
import Legend from "./Legend";
import Container from "./Graph.style";

type GraphProps = {
  userData: GetUserQuery | undefined;
  loading: boolean;
};

function Graph({ userData, loading }: GraphProps) {
  const tab = useStore((state) => state.tab);
  const { username } = useParams();
  const ref = useRef(null);

  const [getFollowings, { data: followingData }] = useGetFollowingsForGraphLazyQuery();
  const [getFollowers, { data: followerData }] = useGetFollowersForGraphLazyQuery();
  const [getRepos, { data: repoData }] = useGetReposForGraphLazyQuery();
  const [getStars, { data: starData }] = useGetStarsForGraphLazyQuery();

  let data: BaseData | undefined;

  if (tab === "followings") {
    data = followingData;
  } else if (tab === "followers") {
    data = followerData;
  } else if (tab === "repositories") {
    data = repoData;
  } else if (tab === "stars") {
    data = starData;
  }

  useEffect(() => {
    const variable = { variables: { username: username || "" } };

    switch (tab) {
      case "followings":
        getFollowings(variable);
        break;
      case "followers":
        getFollowers(variable);
        break;
      case "repositories":
        getRepos(variable);
        break;
      case "stars":
        getStars(variable);
        break;
      default:
        break;
    }
  }, [username, tab]);

  useEffect(() => {
    let destoryFn: () => void;

    if (ref.current && data && userData) {
      destoryFn = runForceGraph(ref.current, data, userData);
    }

    return () => destoryFn && destoryFn();
  }, [username, tab, data, userData]);

  return (
    <Container ref={ref}>
      {(loading || !data) && <Spinner size={60} />}
      <Legend />
    </Container>
  );
}

export default Graph;
