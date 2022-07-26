import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import {
  GetUserQuery,
  useGetFollowersForGraphLazyQuery,
  useGetFollowingsForGraphLazyQuery,
  useGetReposForGraphLazyQuery,
  useGetStarsForGraphLazyQuery,
} from "@/graphql/generated";
import runForceGraph, { BaseData } from "./runForceGraph";
import useStore from "@/hooks/useStore";

const Container = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  padding-left: 410px;
  width: 100vw;
  height: 100vh;
`;

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
  }, [username, tab, data]);

  return <Container ref={ref} />;
}

export default Graph;
