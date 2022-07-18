import styled from "@emotion/styled";

export const Container = styled.div`
  width: 90%;
  margin-top: 15px;
  padding: 10px;
  display: flex;
  gap: 10px;
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
`;

export const Tab = styled.li`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;

  & div:first-of-type {
    font-size: 1.8rem;
    font-weight: 900;
  }
`;
