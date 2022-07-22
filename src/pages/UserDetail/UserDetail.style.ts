import styled from "@emotion/styled";

export const Board = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 410px;
  height: 100vh;
  padding-top: 90px;
  background-color: ${({ theme }) => theme["board-bg"]};
  box-shadow: ${({ theme }) => theme["box-shadow"]};
  overflow-y: scroll;
`;

export const ErrorMessage = styled.h1`
  width: 90%;
  margin-top: 30px;
  font-size: 1.8rem;
  text-align: center;
  color: ${({ theme }) => theme.font};
  white-space: pre-wrap;
  line-height: 3rem;
  & b {
    font-weight: 700;
  }
`;
