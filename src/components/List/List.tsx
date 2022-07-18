import React from "react";

import useStore from "@/hooks/useStore";

function List() {
  const tab = useStore((state) => state.tab);
  return <div>{tab}</div>;
}

export default List;
