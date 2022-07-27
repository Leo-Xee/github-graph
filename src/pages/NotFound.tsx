import React from "react";
import Title from "@/components/common/Title";
import Search from "@/components/Search";

function NotFound() {
  return (
    <main>
      <Search />
      <Title description="잘못된 주소로 접근하신 것 같아요... 😢" />
    </main>
  );
}

export default NotFound;
