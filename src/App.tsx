import React from "react";
import { useUserReposQuery } from "@/graphql/generated";

function App() {
  const { data } = useUserReposQuery({
    variables: {
      username: "leo-xee",
    },
  });
  console.log(data);

  return <h1>Welcome to the React-Starter-Pack</h1>;
}

export default App;
