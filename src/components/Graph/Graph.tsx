import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import { GetUserQuery, useGetFollowingsForGraphQuery } from "@/graphql/generated";
import runForceGraph from "./runForceGraph";

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
  const { username } = useParams();
  const ref = useRef(null);

  const { data } = useGetFollowingsForGraphQuery({ variables: { username: username || "" } });

  useEffect(() => {
    let destoryFn;

    if (ref.current && data && userData) {
      destoryFn = runForceGraph(ref.current, data, userData);
    }

    return destoryFn;
  }, [data, userData]);

  return <Container ref={ref} />;
}

export default Graph;
