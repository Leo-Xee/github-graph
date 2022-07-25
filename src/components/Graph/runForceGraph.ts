/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
import * as d3 from "d3";
import { select, SimulationLinkDatum, SimulationNodeDatum } from "d3";
import {
  GetUserQuery,
  GetFollowingsForGraphQuery,
  GetFollowersForGraphQuery,
  GetReposForGraphQuery,
  GetStarsForGraphQuery,
} from "../../graphql/generated";

type BaseData = GetFollowingsForGraphQuery;
// | GetFollowersForGraphQuery
// | GetReposForGraphQuery
// | GetStarsForGraphQuery;

type RectType = { rect?: SVGRect };
type UserType = { login: string };

type UserNode = SimulationNodeDatum & UserType & RectType;
type UserLink = SimulationLinkDatum<UserNode>;

const filterData = (
  baseData: BaseData,
  userData: GetUserQuery,
): { nodes: UserNode[]; links: UserLink[] } => {
  // console.log("base", baseData);
  // console.log("user", userData);

  const userNode = {
    id: 0,
    login: userData.user?.login || "",
  };

  const nodes: UserNode[] =
    baseData.user?.following.nodes?.map((node, id) => ({
      id: id + 1,
      login: node?.login || "",
    })) || [];
  nodes.unshift(userNode);

  const links: UserLink[] = nodes.map((_, id) => ({ source: 0, target: id }));
  // console.log("nodes", nodes);
  // console.log("links", links);

  return {
    nodes,
    links,
  };
};

const runForceGraph = (
  targetElement: HTMLElement,
  baseData: BaseData,
  userData: GetUserQuery,
): (() => void) => {
  const { nodes, links } = filterData(baseData, userData);

  const { width, height } = targetElement.getBoundingClientRect();

  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).distance(180).strength(0.8))
    .force("charge", d3.forceManyBody().strength(-1250).distanceMin(100).distanceMax(2500))
    .force("collide", d3.forceCollide().radius(33).strength(0.7))
    .force("center", d3.forceCenter((width - 410) / 2, height / 2))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3
    .select(targetElement)
    .append<SVGSVGElement>("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("display", "block");

  const linkGroup = svg.append("g").attr("id", "links");
  const nodeGroup = svg.append("g").attr("id", "nodes");

  const lines = linkGroup
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-opacity", 0.6)
    .attr("stroke", "#999");

  const nodeList = nodeGroup
    .selectAll<SVGGElement, UserNode>(".node")
    .data(nodes)
    .join("g")
    .classed("node", (d) => d.index !== 0)
    .classed("avatar", (d) => d.index === 0)
    .each(function () {
      select<SVGGElement, UserNode>(this).append("rect").style("fill", "#1a73e8");
    })
    .each(function ({ login }) {
      select<SVGGElement, UserNode>(this)
        .append<SVGTextElement>("text")
        .attr("fill", "#fff")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "1.8rem")
        .style("user-select", "none")
        .text(login)
        .call((selection) => {
          selection.each((node) => {
            node.rect = this.getBBox();
          });
        });
    })
    .each(function ({ rect }) {
      select<SVGGElement, UserNode>(this)
        .selectAll<SVGRectElement, UserNode>("rect")
        .attr("width", (rect?.width || 0) + 10)
        .attr("height", (rect?.height || 0) + 4)
        .attr("rx", 12)
        .attr("ry", 12);
    });

  // const avatar = console.log(avatar);

  const rects = nodeList.selectAll<SVGRectElement, UserNode>("rect");
  const texts = nodeList.selectAll<SVGTextElement, UserNode>("text");

  simulation.on("tick", () => {
    lines.attr("x1", (link) => (link.source as UserNode).x || 0);
    lines.attr("y1", (link) => (link.source as UserNode).y || 0);
    lines.attr("x2", (link) => (link.target as UserNode).x || 0);
    lines.attr("y2", (link) => (link.target as UserNode).y || 0);

    rects.attr("x", ({ x, rect }) => (x || 0) - ((rect?.width || 0) + 10) / 2);
    rects.attr("y", ({ y, rect }) => (y || 0) - ((rect?.height || 0) + 4) / 2);

    texts.attr("x", (node) => node.x || 0);
    texts.attr("y", (node) => node.y || 0);
  });

  // Dragging
  const drag = d3
    .drag<SVGGElement, UserNode>()
    .on("start", () => {
      nodeList.style("cursor", "grabbing");
      simulation.alphaTarget(0.1).restart();
    })
    .on("drag", (event: DragEvent, node) => {
      node.fx = event.x;
      node.fy = event.y;
    })
    .on("end", (_, node) => {
      nodeList.style("cursor", "grab");
      simulation.alphaTarget(0);
      node.fx = null;
      node.fy = null;
    });

  nodeList.call(drag);

  // 인스턴스 제거
  const destroy = () => {
    simulation.stop();
    console.log("stop");
  };

  return destroy;
};

export default runForceGraph;
