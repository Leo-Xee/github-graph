/* eslint-disable */
import * as d3 from "d3";
import { select, SimulationLinkDatum, SimulationNodeDatum } from "d3";
import {
  GetUserQuery,
  GetFollowingsForGraphQuery,
  GetFollowersForGraphQuery,
  GetReposForGraphQuery,
  GetStarsForGraphQuery,
} from "../../graphql/generated";

export type BaseData =
  | GetFollowingsForGraphQuery
  | GetFollowersForGraphQuery
  | GetReposForGraphQuery
  | GetStarsForGraphQuery;

type RectType = { rect?: SVGRect };
type UserType = { login: string; followerCount: number };
type RepoType = { name: string; starCount: number };

type ForcedNode = SimulationNodeDatum & UserType & RepoType & RectType;
type ForcedLink = SimulationLinkDatum<ForcedNode>;

type RunForceGraph = {
  (targetElement: HTMLElement, baseData: BaseData, userData: GetUserQuery): () => void;
};

type FilterData = {
  (baseData: any, userData: GetUserQuery): { nodes: ForcedNode[]; links: ForcedLink[] };
};

const filterData: FilterData = (baseData, userData) => {
  let nodes: any = [];
  let links: ForcedLink[] = [];

  if (baseData.user?.following) {
    nodes =
      baseData.user.following.nodes?.map((node, id) => {
        if (id === 0) {
          return {
            id,
            login: userData.user?.login || "",
            followerCount: userData.user?.followers.totalCount || 0,
          };
        }
        return {
          id: id + 1,
          login: node?.login || "",
          followerCount: node?.followers.totalCount || 0,
        };
      }) || [];
    links = nodes.map((_, id) => ({ source: 0, target: id }));
    return { nodes, links };
  }

  if (baseData.user?.followers) {
    nodes =
      baseData.user.followers.nodes?.map((node, id) => {
        if (id === 0) {
          return {
            id,
            login: userData.user?.login || "",
            followerCount: userData.user?.followers.totalCount || 0,
          };
        }
        return {
          id: id + 1,
          login: node?.login || "",
          followerCount: node?.followers.totalCount || 0,
        };
      }) || [];
    links = nodes.map((_, id) => ({ source: 0, target: id }));
    return { nodes, links };
  }

  if (baseData.user?.repositories) {
    nodes =
      baseData.user.repositories.nodes?.map((node, id) => {
        if (id === 0) {
          return {
            id,
            name: userData.user?.login || "",
            starCount: 0,
          };
        }
        return {
          id: id + 1,
          name: node?.name || "",
          starCount: node?.stargazerCount || 0,
        };
      }) || [];
    links = nodes.map((_, id) => ({ source: 0, target: id }));
    return { nodes, links };
  }

  if (baseData.user?.starredRepositories) {
    nodes =
      baseData.user.starredRepositories.nodes?.map((node, id) => {
        if (id === 0) {
          return {
            id,
            name: userData.user?.login || "",
            starCount: 0,
          };
        }
        return {
          id: id + 1,
          name: node?.name || "",
          starCount: node?.stargazerCount || 0,
        };
      }) || [];
    links = nodes.map((_, id) => ({ source: 0, target: id }));
    return { nodes, links };
  }

  return { nodes, links };
};

const runForceGraph: RunForceGraph = (targetElement, baseData, userData) => {
  const { nodes, links } = filterData(baseData, userData);
  const { width, height } = targetElement.getBoundingClientRect();

  // 시뮬레이션 설정
  const simulation = d3
    .forceSimulation(nodes)
    .force("link", d3.forceLink(links).distance(180).strength(0.8))
    .force("charge", d3.forceManyBody().strength(-1000).distanceMin(100))
    .force("collide", d3.forceCollide().radius(35).strength(0.7))
    .force("center", d3.forceCenter((width - 410) / 2, height / 2))
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  // svg 컨테이너 생성
  const svg = d3
    .select(targetElement)
    .append<SVGSVGElement>("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("display", "block");

  // node와 link 분리
  const linkGroup = svg.append("g").attr("id", "links");
  const nodeGroup = svg.append("g").attr("id", "nodes");

  const lineList = linkGroup
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-opacity", 0.8)
    .attr("stroke", "#999");

  const nodeList = nodeGroup
    .selectAll<SVGGElement, ForcedNode>(".node")
    .data(nodes)
    .join("g")
    .classed("node", (d) => d.index !== 0)
    .classed("avatar", (d) => d.index === 0);

  // 전체 노드의 Rect와 Text
  nodeList
    .each(function ({ index, followerCount, starCount }) {
      select<SVGGElement, ForcedNode>(this)
        .append("rect")
        .style("fill", () => {
          if (index === 0) return "#845ef7";
          if ((followerCount || starCount) >= 100 && (followerCount || starCount) < 1000)
            return "#12b886";
          if ((followerCount || starCount) >= 1000) return "#e64980";
          return "#fab005";
        });
    })
    .each(function ({ login, name }) {
      select<SVGGElement, ForcedNode>(this)
        .append<SVGTextElement>("text")
        .attr("fill", "#fff")
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .style("font-size", "1.6rem")
        .style("user-select", "none")
        .text(login || name)
        .call((selection) => {
          selection.each((node) => {
            node.rect = this.getBBox();
          });
        });
    })
    .each(function ({ rect }) {
      select<SVGGElement, ForcedNode>(this)
        .selectAll<SVGRectElement, ForcedNode>("rect")
        .attr("width", (rect?.width || 0) + 10)
        .attr("height", (rect?.height || 0) + 4)
        .attr("rx", 12)
        .attr("ry", 12);
    });

  // 검색된 유저의 Avatar
  const avatar = nodeList
    .filter(".avatar")
    .each(function () {
      select<SVGGElement, ForcedNode>(this).select("rect").attr("transform", "translate(0, 65)");
    })
    .each(function () {
      select(this).select("text").attr("transform", "translate(0, 65)");
    })
    .append("foreignObject")
    .each(function () {
      select<SVGForeignObjectElement, ForcedNode>(this)
        .attr("width", 80)
        .attr("height", 80)
        .style("border-radius", "50%")
        .append("xhtml:img")
        .attr("src", () => userData.user?.avatarUrl || "");
    });

  const rects = nodeList.selectAll<SVGRectElement, ForcedNode>("rect");
  const texts = nodeList.selectAll<SVGTextElement, ForcedNode>("text");

  // 매 Tick 마다 실행
  simulation.on("tick", () => {
    lineList.attr("x1", (link) => (link.source as ForcedNode).x || 0);
    lineList.attr("y1", (link) => (link.source as ForcedNode).y || 0);
    lineList.attr("x2", (link) => (link.target as ForcedNode).x || 0);
    lineList.attr("y2", (link) => (link.target as ForcedNode).y || 0);

    rects.attr("x", ({ x, rect }) => (x || 0) - ((rect?.width || 0) + 10) / 2);
    rects.attr("y", ({ y, rect }) => (y || 0) - ((rect?.height || 0) + 4) / 2);

    texts.attr("x", (node) => node.x || 0);
    texts.attr("y", (node) => node.y || 0);

    avatar.attr("x", (node) => (node.x || 0) - 40);
    avatar.attr("y", (node) => (node.y || 0) - 40);
  });

  // Zoom
  const zoom = d3
    .zoom<SVGSVGElement, unknown>()
    .scaleExtent([0.3, 2])
    .on("zoom", ({ transform }: any) => {
      nodeGroup.attr("transform", transform);
      linkGroup.attr("transform", transform);
    });

  zoom(svg);

  // Drag
  const drag = d3
    .drag<SVGGElement, ForcedNode>()
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
    svg.remove();
  };

  return destroy;
};

export default runForceGraph;
