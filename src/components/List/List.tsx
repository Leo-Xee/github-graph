import styled from "@emotion/styled";
import { Repo } from "api";
import ListItem from "./ListItem";

type ListProps = {
  repoList: Repo[] | undefined;
  isLoading: boolean;
};

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
  padding: 0 10px 30px;
`;

function List({ repoList, isLoading }: ListProps) {
  return (
    <Section>
      {repoList && repoList.length === 0 && <div>해당 키워드로 검색한 내용이 없습니다.</div>}
      {isLoading ? (
        <div>로딩 중</div>
      ) : (
        repoList && repoList.map((repo) => <ListItem key={repo.id} repo={repo} />)
      )}
    </Section>
  );
}

export default List;
