declare module "api" {
  export type User = {
    __typename?: "User";
    login: string;
    name?: string | null;
    bio?: string | null;
    avatarUrl: string;
    company?: string | null;
    location?: string | null;
  };

  export type Repo = {
    __typename?: "Repository";
    name: string;
    description?: string | null;
    stargazerCount: number;
    forkCount: number;
    updatedAt?: any;
    pushedAt?: any;
    primaryLanguage?: { __typename?: "Language"; name: string; color?: string | null } | null;
  };
}
