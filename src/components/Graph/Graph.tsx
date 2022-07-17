import styled from "@emotion/styled";
import React, { useEffect, useRef } from "react";
import runForceGraph from "./runForceGraph";

const Container = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  /* background-color: #fafafa; */
`;

function Graph() {
  const ref = useRef(null);

  useEffect(() => {
    runForceGraph(ref.current);
  }, []);

  return <Container ref={ref} />;
}

export default Graph;
