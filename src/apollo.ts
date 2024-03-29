import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        merge: true,
        fields: {
          following: {
            keyArgs: ["first"],
            merge: (existing, incoming) => {
              if (existing && existing.nodes && incoming.nodes) {
                return { ...existing, ...incoming, nodes: [...existing.nodes, ...incoming.nodes] };
              }
              return { ...existing, ...incoming };
            },
          },
          followers: {
            keyArgs: ["first"],
            merge: (existing, incoming) => {
              if (existing && existing.nodes && incoming.nodes) {
                return { ...existing, ...incoming, nodes: [...existing.nodes, ...incoming.nodes] };
              }
              return { ...existing, ...incoming };
            },
          },
          repositories: {
            keyArgs: ["first"],
            merge: (existing, incoming) => {
              if (existing && existing.nodes && incoming.nodes) {
                return { ...existing, ...incoming, nodes: [...existing.nodes, ...incoming.nodes] };
              }
              return { ...existing, ...incoming };
            },
          },
          starredRepositories: {
            keyArgs: ["first"],
            merge: (existing, incoming) => {
              if (existing && existing.nodes && incoming.nodes) {
                return { ...existing, ...incoming, nodes: [...existing.nodes, ...incoming.nodes] };
              }
              return { ...existing, ...incoming };
            },
          },
        },
      },
    },
  }),
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

export default client;
