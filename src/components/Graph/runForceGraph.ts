import * as d3 from "d3";

type RunForceGraphType = {
  (targetElement: HTMLElement | null): void;
};

type Node = {
  index: number;
  name: string;
};

type Link = {
  source: number;
  target: number;
};

const nodes: Node[] = [
  {
    index: 1,
    name: "Leo",
  },
  {
    index: 2,
    name: "Apeach",
  },
  {
    index: 3,
    name: "Ryan",
  },
  {
    index: 4,
    name: "Con",
  },
  {
    index: 5,
    name: "Neo",
  },
];
const links: Link[] = [
  {
    source: 1,
    target: 2,
  },
  {
    source: 1,
    target: 4,
  },
  {
    source: 1,
    target: 3,
  },
  {
    source: 1,
    target: 5,
  },
  {
    source: 2,
    target: 3,
  },
];

const runForceGraph: RunForceGraphType = (targetElement) => {
  // node에 가해지는 힘을 계산하는 simulation을 생성
  // simulation에 nodes 등록
  // simulation에 links 등록
  // const forceLink = d3
  //   .forceLink(links)
  //   .id(({ index }) => index)
  //   .distance(100)
  //   .strength(1);

  const simulation = d3
    .forceSimulation<Node, Link>(nodes)
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  // console.log(simulation);

  simulation.on("tick", () => {
    console.log(nodes[0]);
  });

  setTimeout(() => simulation.stop(), 500);

  const root = d3
    .select(targetElement)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("display", "block");

  const linkGroup = root.append("g").attr("id", "links");
  const nodeGroup = root.append("g").attr("id", "nodes");

  const circles = nodeGroup
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", 100)
    .attr("fill", "blue");
};

export default runForceGraph;
