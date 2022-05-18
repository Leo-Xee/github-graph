import styled from "@emotion/styled";
import { Repo } from "api";
import SkeletonList from "../SkeletonList";
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

const Message = styled.div`
  margin-top: 20%;
  letter-spacing: -1px;
  font-size: 2rem;
`;

function List({ repoList, isLoading }: ListProps) {
  return (
    <Section>
      {isLoading ? (
        <div data-testid="skeleton">
          <SkeletonList />
        </div>
      ) : (
        repoList && repoList.map((repo) => <ListItem key={repo.id} repo={repo} />)
      )}
      {repoList && repoList.length === 0 && (
        <Message>해당 키워드로 검색한 내용이 없습니다.</Message>
      )}
    </Section>
  );
}

export default List;
