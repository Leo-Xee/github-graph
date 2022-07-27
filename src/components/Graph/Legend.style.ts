import styled from "@emotion/styled";

export const Container = styled.div`
  position: absolute;
  right: 20px;
  bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 20px;
`;

export const List = styled.ul`
  padding: 10px;
  background-color: ${({ theme }) => theme["board-bg"]};
  box-shadow: ${({ theme }) => theme["box-shadow"]};
  border-radius: 10px;
  width: fit-content;

  & li {
    display: flex;
    align-items: center;
    font-size: 1.4rem;
    gap: 5px;
  }
`;

export const Notice = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 1.2rem;
`;

export const Label = styled.span`
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
`;
