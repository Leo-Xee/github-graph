/* eslint-disable */

import { ForcedLink, ForcedNode } from "graph";
import { GetUserQuery } from "@/graphql/generated";

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

export default filterData;
