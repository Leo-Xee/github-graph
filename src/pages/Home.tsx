import React from "react";

import Search from "@/components/Search";
import Title from "@/components/common/Title";

function Home() {
  return (
    <main>
      <Search />
      <Title description="GitHub 유저를 검색하고 그래프 뷰로 확인해보세요." />
    </main>
  );
}

export default Home;
