import styled from "@emotion/styled";

export const Container = styled.div`
  width: 90%;
  margin: 15px 0;
`;
export const List = styled.ul`
  border: ${({ theme }) => theme["search-border"]};
  border-radius: 10px;
`;
