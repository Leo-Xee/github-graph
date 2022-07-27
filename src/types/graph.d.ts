declare module "graph" {
  import { SimulationLinkDatum, SimulationNodeDatum } from "d3";
  import {
    GetFollowersForGraphQuery,
    GetFollowingsForGraphQuery,
    GetReposForGraphQuery,
    GetStarsForGraphQuery,
  } from "@/graphql/generated";

  export type BaseData =
    | GetFollowingsForGraphQuery
    | GetFollowersForGraphQuery
    | GetReposForGraphQuery
    | GetStarsForGraphQuery;

  export type RectType = { rect?: SVGRect };
  export type UserType = { login: string; followerCount: number };
  export type RepoType = { name: string; starCount: number };

  export type ForcedNode = SimulationNodeDatum & UserType & RepoType & RectType;
  export type ForcedLink = SimulationLinkDatum<ForcedNode>;
}
