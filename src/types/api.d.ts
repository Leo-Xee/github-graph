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
}
