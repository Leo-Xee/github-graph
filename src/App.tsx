import React, { useState } from "react";

import Search from "@/components/Search";
import Board from "@/components/Board";
import Graph from "@/components/Graph";

function App() {
  const [username, setUsername] = useState("");
  const [tab, setTab] = useState("");

  console.log("App", username);

  return (
    <main>
      <Search setUsername={setUsername} />
      {username && <Board username={username} />}
      {/* <Graph /> */}
    </main>
  );
}

export default App;
