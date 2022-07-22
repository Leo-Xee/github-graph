import styled from "@emotion/styled";

export const DefaultListContainer = styled.div`
  width: 90%;
  margin: 15px 0;
`;

export const DefaultList = styled.ul`
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
`;

export const Container = styled(DefaultListContainer)``;

export const List = styled(DefaultList)``;
