import { useState } from "react";
import Search from "@/components/Search";
import Title from "@/components/Title";
import List from "@/components/List";
import useFetchRepoList from "@/api/getRepoList";

function HomePage() {
  const [keyword, setKeyword] = useState("");
  console.log(keyword);

  const pageNumber = 1;

  const { isLoading, isError, data } = useFetchRepoList(keyword, pageNumber);

  if (isError) return <div>Error!!!</div>;

  return (
    <div>
      <Title
        title="GitHub Finder"
        description="Github Repository를 검색하고 Issues를 확인할 수 있습니다."
      />
      <Search setKeyword={setKeyword} />
      <List repoList={data} isLoading={isLoading} />
    </div>
  );
}

export default HomePage;
